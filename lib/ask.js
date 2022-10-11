const { prompt } = require("inquirer");
const question = require("./question");

class ASK {
  constructor(option) {
    this.option = option;
    this.question = question;
  }
  askProjectInfo() {
    return prompt(this.question).then((answers) => {
      return answers;
    });
  }
}

module.exports = ASK;
