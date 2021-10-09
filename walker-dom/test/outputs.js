export const outputTest1 = {
  Url: "www.test.com",
  MaxDepth: 2,
  TagsCountingByName: [
    {
      tag: "P",
      counting: 1,
    },
  ],
  AttrCountingByTagName: [
    {
      tag: "P",
      counting: 0,
    },
  ],
  Resources: [],
  ChildsPerTag: [
    {
      tag: "P",
      nChilds: 1,
      childs: "#text",
    },
  ],
};

export const outputTest2 = {
  Url: "www.test.com",
  MaxDepth: 2,
  TagsCountingByName: [
    {
      tag: "IMG",
      counting: 1,
    },
    {
      tag: "P",
      counting: 1,
    },
  ],
  AttrCountingByTagName: [
    {
      tag: "IMG",
      counting: 4,
    },
    {
      tag: "P",
      counting: 0,
    },
  ],
  Resources: [
    {
      tag: "IMG",
      src: "w3schools.jpg",
    },
  ],
  ChildsPerTag: [
    {
      tag: "IMG",
      nChilds: 0,
      childs: "",
    },
    {
      tag: "P",
      nChilds: 1,
      childs: "#text",
    },
  ],
};


export const outputTest3 = {
    Url: "www.test.com",
    MaxDepth: 2,
    TagsCountingByName: [
      {
        tag: "P",
        counting: 2,
      },
    ],
    AttrCountingByTagName: [
      {
        tag: "P",
        counting: 0,
      },
    ],
    Resources: [],
    ChildsPerTag: [
      {
        tag: "P",
        nChilds: 1,
        childs: "#text",
      },
    ],
  };

  export const outputTest4 = {
    Url: "www.test.com",
    MaxDepth: 3,
    TagsCountingByName: [
      {
        tag: "UL",
        counting: 1,
      },
      {
        tag: "LI",
        counting: 3,
      },
      {
        tag: "P",
        counting: 1,
      },
    ],
    AttrCountingByTagName: [
      {
        tag: "UL",
        counting: 0,
      },
      {
        tag: "LI",
        counting: 0,
      },
      {
        tag: "LI",
        counting: 0,
      },
      {
        tag: "LI",
        counting: 0,
      },
      {
        tag: "P",
        counting: 0,
      },
    ],
    Resources: [],
    ChildsPerTag: [
      {
        tag: "UL",
        nChilds: 3,
        childs: "LI,LI,LI",
      },
      {
        tag: "LI",
        nChilds: 1,
        childs: "#text",
      },
      {
        tag: "LI",
        nChilds: 1,
        childs: "#text",
      },
      {
        tag: "LI",
        nChilds: 1,
        childs: "#text",
      },
      {
        tag: "P",
        nChilds: 1,
        childs: "#text",
      },
    ],
  };