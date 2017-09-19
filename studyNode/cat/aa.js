/**
 * Created by YK on 2017/9/18.
 */
let a1 = require("./a1");
let a2 = require("./a2");
console.log("hell cat");
let fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    console.log(argv);
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));