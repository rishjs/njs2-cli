module.exports =function (options) {
    require("../../helper/new-project").execute(options,this.args);
  console.log(this.args);
}