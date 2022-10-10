const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
async function generate() {
  let filesMap = {};
  const templatePath = path.resolve(__dirname, "template");

  const result = await globby(`${templatePath}/**`);
  result.forEach(function (path) {
    const content = fs.readFileSync(path);
    const fileContent = ejs.render(content.toString());
    const fileKey = path.replace(`${templatePath}/`, "");
    filesMap[fileKey] = fileContent;
  });
  return filesMap;
}

module.exports = generate;
