import jsdom from "jsdom";
const { JSDOM } = jsdom;

import { Constants, getFileName, writer } from "./utils.js";

/**
 * Walker by DOM - Main loop responsible for orchestrating the process of going through all of nodes (depth search).
 * @param {string} data - The HTML content
 * @param {string} url - The url
 */
export function walker(data, url) {
  const mapTags = new Map();
  const attrsByTag = [];
  const childsByTag = [];
  const resources = [];

  const dom = new JSDOM(data);
  const items = dom.window.document.body.childNodes;

  let nodesToVisit = [];
  items.forEach((item) => nodesToVisit.push({ node: item, deep: 1 }));

  let maxDepth = 0;
  while (nodesToVisit.length) {
    const elem = nodesToVisit.pop();
    const currentNode = elem.node;
    const currentDepth = elem.deep;
    const tagName = currentNode.nodeName;

    if (maxDepth < currentDepth) maxDepth = currentDepth;

    if (tagName.charAt(0) === "#") continue;

    mapTags.get(tagName) !== undefined
      ? mapTags.set(tagName, mapTags.get(tagName) + 1)
      : mapTags.set(tagName, 1);

    searchAttributes(currentNode, tagName, attrsByTag, resources);

    searchChilds(currentNode, tagName, nodesToVisit, childsByTag, currentDepth);
  }

  // Output
  const tagsCounting = getTagsCounting(mapTags);

  return {
    Url: url,
    MaxDepth: maxDepth,
    TagsCountingByName: tagsCounting,
    AttrCountingByTagName: attrsByTag,
    Resources: resources,
    ChildsPerTag: childsByTag,
  };
}

/**
 * Search attributes in a node.
 * @param {node} currentNode - The current node
 * @param {string} tagName - The current tag
 * @param {array} attrsByTag - The array of attributes by tag
 * @param {array} resources - The array of resources
 */
export const searchAttributes = (
  currentNode,
  tagName,
  attrsByTag,
  resources
) => {
  if (currentNode.hasAttributes()) {
    attrsByTag.push({
      tag: tagName,
      counting: currentNode.attributes.length,
    });

    if (currentNode.hasAttribute("src"))
      getResourcesInAttr(currentNode, tagName, resources);
    return;
  }

  attrsByTag.push({ tag: tagName, counting: 0 });
};

/**
 * Get resources in an attribute.
 * @param {Node} currentNode - The current node
 * @param {string} tagName - The current tag
 * @param {array} resources - The array of resources
 */
export const getResourcesInAttr = (currentNode, tagName, resources) => {
  const src = currentNode.getAttribute("src");
  tagName === "SOURCE"
    ? resources.push({ tag: "VIDEO/" + tagName, src: src })
    : resources.push({ tag: tagName, src: src });
};

/**
 * Search childs in current node and put them in stack to search, as well as the respective depth.
 * @param {Node} currentNode - The current node
 * @param {string} tagName - The current tag
 * @param {array} nodesToVisit - The array (stack) with next nodes to visit
 * @param {array} childsByTag - The array of resources
 * @param {number} currentDepth - Current depth of search
 */
export const searchChilds = (
  currentNode,
  tagName,
  nodesToVisit,
  childsByTag,
  currentDepth
) => {
  const childs = [];
  if (currentNode.childNodes.length > 0) {
    currentNode.childNodes.forEach((childNode) => {
      nodesToVisit.push({
        node: childNode,
        deep: currentDepth + 1,
      });
      childs.push(childNode.nodeName);
    });
  }
  childsByTag.push({
    tag: tagName,
    nChilds: childs.length,
    childs: childs.toString(),
  });
};

/**
 * Transform map with tags counting to output.
 * @param {Map} mapTags - Map with tags counting
 */
const getTagsCounting = (mapTags) => {
  const tagsCounting = [];
  mapTags.forEach((value, key) =>
    tagsCounting.push({ tag: key, counting: value })
  );
  return tagsCounting;
};
