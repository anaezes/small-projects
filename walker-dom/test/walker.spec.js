import { readFileSync } from "fs";
import {
  walker,
  searchAttributes,
  getResourcesInAttr,
  searchChilds,
} from "../bin/walker.js";

import {
  outputTest1,
  outputTest2,
  outputTest3,
  outputTest4,
} from "./outputs.js";

test("test walker - should be valid", () => {
  // Arrange
  const data = "<!DOCTYPE html><html><body><p>Hello world</p><body></html>";
  const output = outputTest1;

  // Act
  const result = walker(data, "www.test.com");

  // Assert
  expect(result).toMatchObject(output);
});

test("test walker with resource - should be valid", () => {
  // Arrange
  const data = `<!DOCTYPE html><html><body><p>Hello world</p> <img src="w3schools.jpg" alt="W3Schools.com" width="104" height="142"><body></html>`;
  const output = outputTest2;

  // Act
  const result = walker(data, "www.test.com");

  // Assert
  expect(result).toMatchObject(output);
});

test("test walker - should be invalid", () => {
  // Arrange
  const data = "<!DOCTYPE html><html><body><p>Hello world</p><body></html>";
  const output = outputTest3;

  // Act
  const result = walker(data, "www.test.com");

  // Assert
  expect(result).not.toMatchObject(output);
});

test("test walker with list - should be valid", () => {
  // Arrange
  const data =
    "<!DOCTYPE html><html><body><p>Hello world</p><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul><body></html>";
  const output = outputTest4;

  // Act
  const result = walker(data, "www.test.com");

  // Assert
  expect(result).toMatchObject(output);
});

test("test searchAttributes - should be valid", () => {
  // Arrange
  const img = document.createElement("img");
  img.alt = "W3Schools.com";
  img.src = "w3schools.jpg";

  const tagName = "IMG";
  const attrsByTag = [];

  // Act
  searchAttributes(img, tagName, attrsByTag, []);

  // Assert
  expect(attrsByTag).toMatchObject([{ tag: tagName, counting: 2 }]);
});

test("test searchAttributes - should be invalid", () => {
  // Arrange
  const img = document.createElement("img");
  img.alt = "W3Schools.com";
  img.src = "w3schools.jpg";

  const tagName = "IMG";
  const attrsByTag = [];

  // Act
  searchAttributes(img, tagName, attrsByTag, []);

  // Assert
  expect(attrsByTag).not.toMatchObject([{ tag: tagName, counting: 3 }]);
});

test("test getResourcesInAttr with video - should be valid", () => {
  // Arrange
  const videoSource = document.createElement("source");
  videoSource.src = "movie.mp4";

  const tagName = "SOURCE";
  const resources = [];

  // Act
  getResourcesInAttr(videoSource, tagName, resources);

  // Assert
  expect(resources).toMatchObject([
    { tag: "VIDEO/" + tagName, src: videoSource.src },
  ]);
  expect(resources).not.toMatchObject([{ tag: tagName, src: videoSource.src }]);
});

test("test getResourcesInAttr with img - should be valid", () => {
  // Arrange
  const img = document.createElement("img");
  img.alt = "W3Schools.com";
  img.src = "w3schools.jpg";

  const tagName = "IMG";
  const resources = [];

  // Act
  getResourcesInAttr(img, tagName, resources);

  // Assert
  expect(resources).toMatchObject([{ tag: tagName, src: img.src }]);
  expect(resources).not.toMatchObject([{ tag: tagName, src: img.alt }]);
});

test("test searchChilds - should be valid", () => {
  // Arrange
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  ul.appendChild(li1);
  ul.appendChild(li2);
  const tagName = "UL";
  const nodesToVisit = [];
  const childsByTag = [];
  let currentDepth = 2;

  // Act
  searchChilds(ul, tagName, nodesToVisit, childsByTag, currentDepth);

  // Assert
  expect(nodesToVisit).toMatchObject([
    {
      node: li1,
      deep: currentDepth + 1,
    },
    {
      node: li2,
      deep: currentDepth + 1,
    },
  ]);
  expect(childsByTag).toMatchObject([
    {
      tag: tagName,
      nChilds: 2,
      childs: "LI,LI",
    },
  ]);
});

test("test searchChilds - should be invalid", () => {
  // Arrange
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  const tagName = "UL";
  const nodesToVisit = [];
  const childsByTag = [];
  let currentDepth = 2;

  // Act
  searchChilds(ul, tagName, nodesToVisit, childsByTag, currentDepth);

  // Assert
  expect(nodesToVisit).not.toMatchObject([
    {
      node: li1,
      deep: currentDepth + 1,
    },
    {
      node: li2,
      deep: currentDepth + 1,
    },
  ]);
  expect(childsByTag).not.toMatchObject([
    {
      tag: tagName,
      nChilds: 2,
      childs: "LI,LI",
    },
  ]);
});
