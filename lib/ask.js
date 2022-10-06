const { prompt } = require("inquirer");

const questions = [
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
  {
    name: "projectName",
    type: "input",
    message: "Please enter project name",
  },
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
];
function askProjectInfo() {
  return prompt(questions).then((answers) => {
    return answers;
  });
}

module.exports = askProjectInfo;
