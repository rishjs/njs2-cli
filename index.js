#!/usr/bin/env node
const{Command } = require('commander');
const program = new Command();
const requireDir = require("require-dir")

const allCommands = requireDir("./commands", {
    recurse: true
})

Object.values(allCommands)
	.reduce((all, commandData) => {
		const {describe: {command,argument,description,summary,usage}, index: response} = commandData;
		return program.command(command)
        .argument(argument)
        .description(description)
        .summary(summary)
        .usage(usage)
        .showHelpAfterError('(add --help for additional information)')
        .action(response)
	},process.argv)
    program.parse()
