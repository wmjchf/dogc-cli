const { prompt } = require("inquirer");

class ASK {
  constructor(option) {
    this.option = option;
    this.questions = [
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
        name: "description",
        when: !this.option.description,
        type: "input",
        message: "Please enter a project description",
      },
      {
        name: "author",
        type: "input",
        message: "Please enter a author",
      },
    ];
  }
  askProjectInfo() {
    return prompt(this.questions).then((answers) => {
      return answers;
    });
  }
}

module.exports = ASK;
