const path = require("path");
const fsp = require("fs").promises;
//const Directory = require("../model/directory");
const { logger } = require("../utils");

async function SearchFileinDir(directory, regExp) {
  logger.debug(`Entered function SearchFileinDir with params: ${regExp}`);
  try {
    const countArr = new Array();
    let fileList = await getFilesFromDirectory(directory);

    for (file of fileList) {
      let count = 0;
      const data = await fsp.readFile(file, "utf8");
      count = data.match(regExp) !== null ? data.match(regExp).length : 0;
      countArr.push(count);
    }
    magicStringCount = countArr.reduce((acc, item) => {
      acc = acc + item;
      return acc;
    });
    fileList = fileList.map((x) => {
      return x.replace(/^.*[\\\/]/, "").replace(" ", "_");
    });
    logger.debug(`Exited function SearchFileinDir.`);
    return { fileList, magicStringCount };
  } catch (err) {
    logger.error(`Error in SearchFileinDir: ${err}`);
    throw new Error(err);
  }
}

async function getFilesFromDirectory(dir) {
  logger.debug(`Entered function getFilesFromDirectory with params: ${dir}`);

  let files = [];
  const filesFromDirectory = await fsp.readdir(dir).catch((err) => {
    logger.error(`Error in getFilesFromDirectory: ${err}`);
    throw new Error(err);
  });
  try {
    for (let file of filesFromDirectory) {
      const filePath = path.join(dir, file);
      const stat = await fsp.lstat(filePath);
      if (stat.isDirectory()) {
        const nestedFiles = await getFilesFromDirectory(filePath);
        files = files.concat(nestedFiles);
      } else {
        files.push(filePath);
      }
    }
    files = files.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
    logger.debug(`Exited function getFilesFromDirectory.`);
    return files;
  } catch (err) {
    logger.error(`Error in getFilesFromDirectory: ${err}`);
    throw new Error(err);
  }
}

// async function CreateFileList(fileList, id) {
//   try {
//     logger.debug(
//       `Entered function CreateFileList with params: ${fileList},${id}`
//     );
//     await fileList.map((x) => {
//       Directory.create({
//         taskId: id,
//         fileName: x,
//       });
//     });
//     logger.debug(`Exited function CreateFileList.`);
//   } catch (err) {
//     logger.error(`Error in CreateFileList: ${err}`);
//     throw new Error(err);
//   }
// }
module.exports = { SearchFileinDir };

// var fs        = require('fs');
// var readline  = require('readline');

// var server = http.createServer( function(req, res) {
//   console.log("Request received.");

//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.write("Hello World\n\n\n");

//   readline.createInterface({
//     input     : fs.createReadStream(process.argv[2]),
//     terminal  : false
//   }).on('line', function(line) {
//     var idx = line.indexOf(THE_SUBSTRING);
//     if (idx !== -1) {
//       res.write(line + '\n');
//     }
//   }).on('close', function() {
//     res.end();
//   });
// });
