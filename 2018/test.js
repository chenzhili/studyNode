// 这个是事件机制
/* const events = require("events");
const util = require("util");
console.log(__dirname);
console.log(__filename);

function Animal(name){
    this.name = name;
}
util.inherits(Animal,events.EventEmitter);

let cat = new Animal("cat");

cat.on("sub",(mess)=>{
    console.log(`${cat.name} is a cat ${mess}?`);
});

cat.emit("sub","yes"); */

// 异步合同部读取文件
const fs = require("fs");

let text = fs.readFileSync("./readme.md","utf-8")
console.log(text);
fs.readFile("./readme.md","utf-8",(err,data)=>{
    console.log(data);
});
fs.writeFileSync("./write.md",text);