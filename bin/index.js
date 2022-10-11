#!/usr/bin/env node
const program = require("commander");

const figlet = require("figlet");

const package = require("../package.json");

const create = require("../lib/create.js");

const { version } = package;

console.log(figlet.textSync("Dogc Hello!"));

program.version(version).option("-v,--version");
// 生成组件库模板
program
  .command("create <component-libs-name>")
  .description("create a react component template")
  .option("-d,--description <description>", "add a detail descript")
  .action((appName, options) => {
    // 创建操作的逻辑，这里会以问题询问的方式获取项目信息，见第二步的方法
    create(appName, options);
  });

program.parse(process.argv); // 把命令行参数传给commander解析
