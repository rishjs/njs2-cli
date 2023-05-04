#!/usr/bin/env node
const{Command } = require('commander');
const program = new Command();
const requireDir = require("require-dir")
const colors = require("colors");

const allCommands = requireDir("./commands", {
    recurse: true
})

Object.values(allCommands)
	.filter((commandData) => {
		const {describe: {command,description, arguments,summary,usage}, index: response} = commandData;
        const p=program.command(command)
        .description(description.yellow)
        .summary(summary)
        .usage(usage)
        .showHelpAfterError('(add --help or -h for additional information)')
        .action(response);
        addArgs(p,arguments);
	})

program.showHelpAfterError()
        .parse();

function addArgs(prg, args) {
    for(let arg of args) {
        prg.argument(arg)
    }                                                                  
  }
