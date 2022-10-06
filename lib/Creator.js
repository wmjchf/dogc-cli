const EventEmitter = require("events");
const chalk = require("chalk");
const execa = require("execa");
const fs = require("fs-extra");
const writeFileTree = require("./utils/writeFileTree.js");
const { log } = require("./utils/logger.js");

const { hasGit, hasProjectGit } = require("./utils/env.js");

class Creator extends EventEmitter {
  constructor(name, context) {
    super();
    this.name = name;
    this.context = context; // 项目绝对路径
  }
  async create(cliOptions = {}) {
    const { name, context } = this;
    const { description, author } = cliOptions;
    log(`✨ creating project in ${chalk.yellow(context)}...`);
    log();
    const pkg = {
      name,
      version: "1.0.0",
      private: true,
      description,
      author,
      devDependencies: {},
    };

    await writeFileTree(context, {
      "package.json": JSON.stringify(pkg, null, 2),
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
