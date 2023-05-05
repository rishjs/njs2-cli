module.exports =function (projectname,version,versionnumber) {
  const argv={
    "project_name":projectname,
    "version":version,
    "version_number":versionnumber
  }
  require("../../helper/new-project").execute(argv);
}