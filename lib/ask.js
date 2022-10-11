const { prompt } = require("inquirer");

class ASK {
  constructor(option) {
    this.option = option;
    this.questions = [];
  }
  askProjectInfo() {
    return prompt(this.questions).then((answers) => {
      return answers;
    });
  }
  resolveFinalQuestion() {}
}

module.exports = ASK;
