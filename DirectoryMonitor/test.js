// const moment = require("moment");
// let startTime = "2020-09-13T21:59:00.003Z";
// let endTime = "2020-09-13T21:59:00.031Z";

// console.log(moment(endTime).diff(moment(startTime), "millisecond"));

let prevFileList = new Array();
let currentFileList = [
  "lorem_copy",
  "10.txt",
  "lorem_copy",
  "9.txt",
  "4.txt",
  "loremipsum_copy",
  "5.txt",
  "loremipsum_copy",
];
let filesAdded = currentFileList.filter((file) => {
  return !prevFileList.includes(file);
});
let filesDeleted = prevFileList.filter((file) => {
  return !currentFileList.includes(file);
});
console.log(filesAdded);
console.log("****");
console.log(filesDeleted);
