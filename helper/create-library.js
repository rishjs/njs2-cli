#!/usr/bin/env node
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

const execute = async (argv) => {
  try {
    if (!fs.existsSync(`${path.resolve(process.cwd(), `package.json`)}`))
      throw new Error(
        "njs2 library <path> to be run from project root directory".red
      );

    const package_json = require(`${path.resolve(
      process.cwd(),
      `package.json`
    )}`);
    if (package_json["njs2-type"] != "project") {
      throw new Error(
        "njs2 library <path> to be run from project root directory".red
      );
    }

    let splitString = argv.foldername.split("/");

    let COPY_TEMP_SCRIPT = "";
    const LIB_NAME = argv.foldername;
    const LIB_PATH = `src/library/${LIB_NAME}`;
    if (!fs.existsSync(LIB_PATH)) {
      fs.mkdirSync(LIB_PATH);
    }
    const LIB_FILE_NAME = argv.filename;
    const LIB_FILE_PATH = `src/library/${LIB_NAME}/${LIB_FILE_NAME}.lib.js`;
    if (fs.existsSync(LIB_FILE_PATH)) {
      throw new Error(`library file name  already exists: ${LIB_FILE_PATH}`.red);
    }

    argv.choices = argv.choices == undefined ? "default" : argv.choices;

    if (argv.choices === "sql") {
      COPY_TEMP_SCRIPT = `cp -rn "${path.resolve(
        process.cwd(),
        "."
      )}/node_modules/@njs2/base/template/libraryStructure/sql/." "${path.resolve(
        process.cwd(),
        "."
      )}/${LIB_PATH}"`;
    } else if (argv.choices === "mongo") {
      COPY_TEMP_SCRIPT = `cp -rn "${path.resolve(
        process.cwd(),
        "."
      )}/node_modules/@njs2/base/template/libraryStructure/mongo/." "${path.resolve(
        process.cwd(),
        "."
      )}/${LIB_PATH}"`;
    } else {
      COPY_TEMP_SCRIPT = `cp -rn "${path.resolve(
        process.cwd(),
        "."
      )}/node_modules/@njs2/base/template/libraryStructure/default/." "${path.resolve(
        process.cwd(),
        "."
      )}/${LIB_PATH}"`;
    }

    child_process.execSync(COPY_TEMP_SCRIPT);

    fs.renameSync(
      `${path.resolve(
        process.cwd(),
        `src/library/` + argv.foldername + `/` + argv.choices + `.lib.js`
      )}`,
      `${path.resolve(
        process.cwd(),
        `src/library/` + argv.foldername + `/` + LIB_FILE_NAME + ".lib.js"
      )}`
    );

 
    let executeFileContents = fs.readFileSync(
      path.resolve(process.cwd(), LIB_PATH + "/" + LIB_FILE_NAME + ".lib.js"),
      "utf8"
    );
    executeFileContents = executeFileContents
      .replace(
        /<class-name>/g,
        LIB_FILE_NAME.charAt(0).toLowerCase() + LIB_FILE_NAME.slice(1)
      )
      .replace(
        /<function-name>/g,
        LIB_FILE_NAME.charAt(0).toUpperCase() + LIB_FILE_NAME.slice(1)
      );
    fs.writeFileSync(
      path.resolve(process.cwd(), `${LIB_PATH}/${LIB_FILE_NAME}.lib.js`),
      executeFileContents
    );
    console.log('\x1b[32m',`Sucessfully created ${LIB_PATH}/${LIB_FILE_NAME}.lib.js`.green);
    if(argv.choices === "mongo"){
      fs.renameSync(
        `${path.resolve(
          process.cwd(),
          `src/library/`+ argv.foldername + `/`+`model/model.js`
        )}`,
        `${path.resolve(
          process.cwd(),
          `src/library/`+ argv.foldername + `/`+`model/` + LIB_FILE_NAME + ".js"
        )}`
      );

      executeFileContents = fs.readFileSync(
        path.resolve(process.cwd(), `src/library/`+ argv.foldername + `/`+`model/` + LIB_FILE_NAME + ".js"),
        "utf8"
      );
      executeFileContents = executeFileContents
      .replace(
        /<class-name>/g,
        LIB_FILE_NAME.charAt(0).toLowerCase() + LIB_FILE_NAME.slice(1)
      )
      .replace(
        /<function-name>/g,
        LIB_FILE_NAME.charAt(0).toUpperCase() + LIB_FILE_NAME.slice(1)
      );

      fs.writeFileSync(
        path.resolve(process.cwd(), `src/library/`+ argv.foldername + `/`+`model/` + LIB_FILE_NAME + ".js"),
        executeFileContents
      );
      console.log('\x1b[32m',`Sucessfully created src/library/`+ argv.foldername + `/`+`model/` + LIB_FILE_NAME + ".js".green);
    }
  } catch (e) {
    console.log(colors.red('\x1b[31m',e));
  }
};

module.exports.execute = execute;
