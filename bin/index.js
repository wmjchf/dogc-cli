#!/usr/bin/env node
const program = require("commander");

const figlet = require("figlet");

const package = require("../package.json");

const askProjectInfo = require("../lib/ask.js");

const create = require("../lib/create.js");

const { version } = package;

figlet("Dogc Hello!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

program.version(version).option("-v,--version");

program.command("create").action(() => {
  // 创建操作的逻辑，这里会以问题询问的方式获取项目信息，见第二步的方法
  askProjectInfo().then((answers) => {
    create(answers);
  });
});

program.parse(process.argv); // 把命令行参数传给commander解析
