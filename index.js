#!/usr/bin/env node
const{Command } = require('commander');
const program = new Command();
const requireDir = require("require-dir")
const colors = require("colors");

const allCommands = requireDir("./commands", {
    recurse: true
})

Object.values(allCommands)
	.reduce((all, commandData) => {
		const {describe: {command,description,summary,usage}, index: response} = commandData;
		return program.command(command)
        .description("For Example:"+description.yellow)
        .summary(summary)
        .usage(usage)
        .showHelpAfterError('(add --help or -h for additional information)')
        .action(response)
	},process.argv)

    program.addHelpText('after',"Example call:"+` 
  njs2 project <project-name> [version] [version-number] 
  njs2 endpoint <endpoint-name>
  njs2 run
  njs2 run serverless
  njs2 run express
  njs2 run nodemon
  njs2 plugin <plugin-name>
  njs2 plugin uninstall <plugin-name>
  njs2 plugin compile
  njs2 plugin install [<plugin-name>]
  njs2 library <folder-name> <filename> <options : [sql,mongo]>
  njs2 upgrade [version] [version-number]`.yellow)
  .showHelpAfterError()
  .parse();
