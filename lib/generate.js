const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
const ConfigTransform = require("./ConfigTransform");
const defaultConfigTransforms = {
  babel: new ConfigTransform({
    file: {
      js: ["babel.config.js"],
    },
  }),
  postcss: new ConfigTransform({
    file: {
      js: ["postcss.config.js"],
      json: [".postcssrc.json", ".postcssrc"],
      yaml: [".postcssrc.yaml", ".postcssrc.yml"],
    },
  }),
  eslintConfig: new ConfigTransform({
    file: {
      js: [".eslintrc.js"],
      json: [".eslintrc", ".eslintrc.json"],
      yaml: [".eslintrc.yaml", ".eslintrc.yml"],
    },
  }),
  jest: new ConfigTransform({
    file: {
      js: ["jest.config.js"],
    },
  }),
  browserslist: new ConfigTransform({
    file: {
      lines: [".browserslistrc"],
    },
  }),
  "lint-staged": new ConfigTransform({
    file: {
      js: ["lint-staged.config.js"],
      json: [".lintstagedrc", ".lintstagedrc.json"],
      yaml: [".lintstagedrc.yaml", ".lintstagedrc.yml"],
    },
  }),
};
class Generate {
  constructor() {
    this.defaultConfigTransforms = defaultConfigTransforms;
  }
  async generate(answer) {
    let filesMap = {};
    const templatePath = path.resolve(__dirname, "template");

    const result = await globby(`${templatePath}/**`);
    result.forEach(function (path) {
      const content = fs.readFileSync(path, "utf-8");
      console.log(answer, "dddddd");
      const fileContent = ejs.render(content, answer);
      const fileKey = path.replace(`${templatePath}/`, "");
      filesMap[fileKey] = fileContent;
    });
    return filesMap;
  }
}

module.exports = Generate;
