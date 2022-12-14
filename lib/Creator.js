const EventEmitter = require("events");
const chalk = require("chalk");
const execa = require("execa");
const writeFileTree = require("./utils/writeFileTree.js");
const ASK = require("./ASK");
const Generate = require("./Generate");
const { log } = require("./utils/logger.js");

const { hasGit, hasProjectGit } = require("./utils/env.js");

class Creator extends EventEmitter {
  constructor(name, context) {
    super();
    this.name = name;
    this.context = context; // 项目绝对路径
    this.cliOptions = {};
  }
  async create(cliOptions = {}) {
    this.cliOptions = cliOptions;
    const { name, context } = this;
    const { description: defaultDescription } = this.cliOptions;
    const answer = await this.promptAndResolvePreset();
    const { description } = answer;
    log(`✨ creating project in ${chalk.yellow(context)}...`);
    log();

    // await writeFileTree(context, {
    //   "package.json": JSON.stringify(pkg, null, 2),
    // });
    const generator = new Generate();

    const filesMap = await generator.generate({
      ...answer,
      name,
      description: defaultDescription || description,
    });

    Object.keys(filesMap).forEach(async function (path) {
      await writeFileTree(context, { [path]: filesMap[path] });
    });
    const shouldInitGit = this.shouldInitGit();
    if (shouldInitGit) {
      log(`✨ initializing git repository...`);
      log();
      this.emit("creation", { event: "git-init" });
      this.run("git init");
      log(`${chalk.green("✔ git init success!")}`);
    }
    log();
    log(`🎉  Successfully created project ${chalk.green(name)}.`);
    log();
    log(
      `👉  Get started with the following commands:\n\n` +
        (this.context === process.cwd()
          ? ``
          : chalk.cyan(` ${chalk.gray("$")} cd ${name}\n`)) +
        chalk.cyan(` ${chalk.gray("$")} npm install`)
    );
  }
  // 询问开发者的详细配置信息
  async promptAndResolvePreset() {
    const ask = new ASK(this.cliOptions);
    const answer = await ask.askProjectInfo();
    return answer;
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    execa(command, args, { cwd: this.context });
  }

  shouldInitGit() {
    if (!hasGit()) {
      return false;
    }
    return !hasProjectGit(this.context);
  }
}

module.exports = Creator;
