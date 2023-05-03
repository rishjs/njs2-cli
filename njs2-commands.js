#!/usr/bin/env node
const{Command } = require('commander');
const program = new Command();
const colors = require("colors");

class Njs2Commands{
  static commands(){
  //njs2 project <project-name> [version] [version-number] 
  program
  .command('project')
  .argument('<project-name>','Name of the Project')
  .argument('[version] [<version-number>]','Version of the Project')
  //.option('-v, --version <versionNumber>', 'version of the project')
  .description("For example:"+`
   njs2 project cricket-backend version 2.0.0`.yellow)
  .summary('Create a new Project')
  .usage('<projectname> [version] [<version-number>]')
  .showHelpAfterError()
  .action(function (projectname,version,versionnumber,options) {
    require("./helper/new-project").execute(options,this.args);
  });

  //njs2 endpoint <endpoint-name>
  program
  .command('endpoint')
  .argument('<endpoint-name>','Name of the Endpoint')
  .description("For example:"+`
  njs2 endpoint user.getDetails`.yellow)
  .summary('Create a new Endpoint')
  .usage('<endpoint-name>')
  .showHelpAfterError()
  .action(function(endpointname,options)  {
    //execute;
    require("./helper/create-endpoint").execute(options,this.args);
  });

  // njs2 plugin <plugin-name>
  // njs2 plugin uninstall <plugin-name>
  // njs2 plugin compile
  // njs2 plugin install [<plugin-name>]
  const plugin= program.command('plugin')
  .description("For example:"+`
  njs2 plugin install @juego/njs2-auth-email
  njs2 plugin compile
  njs2 plugin uninstall @juego/njs2-auth-email
  `.yellow)
  .summary('Create Plugin')
  .usage('[command]')
  .showHelpAfterError('(add --help for additional Plugin Commands)');

  plugin
  .command('install').alias('i')
  .argument('[<plugin-name>]', 'Name of the Plugin')
  .action(function(pluginname,options)  {
    require("./helper/install-plugin").execute(options, this.args);
  });

  plugin
  .command('uninstall')
  .argument('<plugin-name>', 'Name of the Plugin')
  .action(function(pluginname,options){
    require("./helper/uninstall-plugin").execute(options, this.args);
  });

  plugin
  .command('compile')
  .action(function(args,options)  {
    require("./helper/compile-all-plugin").execute(options, this.args);
  });

  plugin
  .argument('<plugin-name>', 'Name of the Plugin')
  .action(function(args,options) {
    require("./helper/create-plugin").execute(options, this.args);
  });

  // njs2 run serverless
  // njs2 run express
  // njs2 run nodemon
  program
  .command('run')
  .argument('[<choices>]','serverless,express,nodemon')
  .description("For example:"+`
  run
  run serverless
  run express
  run nodemon`.yellow)
  .usage('[<choices:serverless,express,mongo>]')
  .summary('Run Commands')
  .showHelpAfterError()
  .action(function(choices,options) {
    require("./helper/run").execute(options,this.args);
  });

  //njs2 library <folder-name> <filename> <options : [sql,mongo]>
  program
  .command('library')
  .argument('<foldername>','foldername')
  .argument('<filename>','filename')
  .argument('[<choices>]','sql,mongo')
  .description("For example:"+`
  njs2 library sqllib user sql`.yellow)
  .usage('<foldername> <filename> [<choices:sql,mongo>]')
  .summary('Create a new Library')
  .showHelpAfterError()
  .action(function(foldername,filename,choices,options) {
    //execute;
    require("./helper/create-library").execute(options,this.args);
  });

  //njs2 upgrade [version] [version-number]
  program
  .command('upgrade')
  .argument('[version] [<version-number>]','version and version-number')
  .description("For example:"+`
  upgrade version 2.0.0`.yellow)
  .usage('[version] [version-number]')
  .summary('Upgrade')
  .action(function(version,versionnumber,options) {
    //execute;
    require("./helper/upgrade-project").execute(options,this.args);
  });

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
  njs2 upgrade [version] [version-number]`.yellow);
  
  program.showHelpAfterError('(add --help for additional information)')
  return program
 }
}
module.exports=Njs2Commands;