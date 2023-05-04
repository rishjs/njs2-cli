module.exports =function (projectname,version,versionnumber,options) {
  const argv={
    "project_name":projectname,
    "version":version,
    "version_number":versionnumber
  }
  require("../../helper/new-project").execute(argv);
}