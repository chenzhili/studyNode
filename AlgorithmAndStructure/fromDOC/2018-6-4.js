/**
 * 字典
 */
function Dictionary(){
    this.data = [];
}
Dictionary.prototype = {
    add(key,value){
        this.data[key]=value;
    },
    find(key){
        return this.data[key];
    },
    remove(key){
        delete this.data[key];
    },
    showAll(){
        for(let key of Object.keys(this.data)){
            console.log(`${key}:${this.data[key]}`);
        }
    },
    showAllSort(){
        for(let key of Object.keys(this.data).sort()){
            console.log(`${key}:${this.data[key]}`);
        }
    },
    count(){
        return Object.keys(this.data).length;
    },
    clear(){
        Object.keys(this.data).forEach(v=>{
            this.remove(v);
        });
        // console.log(this.data);
    }
}
/* var pbook = new Dictionary();
pbook.add("Mike","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
console.log("David's extension: " + pbook.find("David"));
pbook.remove("David");
pbook.showAll();
console.log(pbook.count());
pbook.clear(); */

// 练习
/* 
写一个程序， 该程序从一个文本文件中读入名字和电话号码， 然后将其存入一个字典。
该程序需包含如下功能： 显示单个电话号码、 显示所有电话号码、 增加新电话号码、 删
除电话号码、 清空所有电话号码
*/
const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync(path.join("./userInfo.json"),"utf-8"));
// console.log(typeof data);

const userInfo = new Dictionary();
Object.keys(data).forEach(v=>{
    userInfo.add(v,data[v]);
});
// userInfo.showAll();

/* 
使用 Dictionary 类写一个程序， 该程序用来存储一段文本中各个单词出现的次数。 该程
序显示每个单词出现的次数， 但每个单词只显示一次
*/
const repeatNum = new Dictionary();
let result = (str)=>{
    str.split(" ").forEach(v=>{
        if(!repeatNum.find(v)){
            repeatNum.add(v,1);
        }else{
            let i = Number(repeatNum.find(v));
            repeatNum.add(v,++i);
        }
    });
    // repeatNum.showAll();
    repeatNum.showAllSort();
}
result("the brown fox jumped over the blue fox")


