const projectBaseQ = [
  {
    name: "description",
    type: "input",
    message: "Please enter a project description",
  },
  {
    name: "author",
    type: "input",
    message: "Please enter a author",
  },
  {
    name: "componentLibrary",
    type: "list",
    message: "Please select the appropriate component library",
    choices: [
      {
        name: "element",
        value: "element",
        short: "element",
      },
      {
        name: "antd",
        value: "antd",
        short: "antd",
      },
      {
        name: "materialUI",
        value: "materialUI",
        short: "materialUI",
      },
    ],
  },
];
const projectPresetQ = [
  {
    name: "preset",
    type: "list",
    message: "Please select a preset:",
    choices: [
      {
        name: "Default(ESlint、Babel)",
        value: "Default",
        short: "Default",
      },
      {
        name: "Manually select features",
        value: "Manually",
        short: "Manually",
      },
    ],
  },
];
const projectFeatureQ = [
  {
    name: "feature",
    type: "list",
    message: "Please select feature:",
    choices: [],
  },
];

module.exports = {
  projectBaseQ,
  projectPresetQ,
  projectFeatureQ,
};
