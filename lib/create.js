const chalk = require("chalk");
const inquirer = require("inquirer");
const validateProjectName = require("validate-npm-package-name");
const path = require("path");
const fs = require("fs-extra");
const Creator = require("./Creator.js");
async function create(projectName, cliOptions) {
  // 获取node进程的工作目录
  const cwd = process.cwd();
  // 判断是否是当前目录
  const inCurrentDir = projectName === ".";
  // 获取项目名(当前目录 or 指定的项目名)
  const name = inCurrentDir ? path.relative("../", cwd) : projectName;
  // 真正的目录地址
  const targetDir = path.resolve(cwd, projectName);
  // 校验项目名(包名)是否合法
  const validateResult = validateProjectName(name);
  if (!validateResult.validForNewPackages) {
    // 打印出错误以及警告
    console.error(chalk.red(`Invalid project name: "${name}"`));
    validateResult.errors &&
      validateResult.errors.forEach((error) => {
        console.error(chalk.red.dim(`Error: ${error}`));
      });
    validateResult.warnings &&
      validateResult.warnings.forEach((warn) => {
        console.error(chalk.red.dim(`Warning: ${warn}`));
      });
    process.exit(1);
  }
  if (fs.existsSync(targetDir)) {
    // 目录存在有两种情况: 1. 当前目录创建 2. 确实存在同名目录
    if (inCurrentDir) {
      // 当前目录下创建给用户提示
      const { ok } = await inquirer.prompt([
        {
          name: "ok",
          type: "confirm",
          message: `Generate project in current directory?`,
        },
      ]);
      if (!ok) {
        return;
      }
    } else {
      // 待创建目录已经存在
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `Target directory ${chalk.cyan(targetDir)}
              already exists. Pick an action:`,
          choices: [
            { name: "Overwrite", value: "overwrite" },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);

        await fs.remove(targetDir);
      }
    }
  }
  // 目录不存在
  const creator = new Creator(projectName, targetDir);

  await creator.create(cliOptions);
}
module.exports = create;
