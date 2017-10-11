/**
 * Created by YK on 2017/9/22.
 */
let fs = require("fs");
let path = require("path");
let absoluteUrl = process.cwd();
/*这个属于小文件的拷贝*/
/*原理是一次性读取所有的文件存入到内存中，然后一次性拷贝到对应的目标文件中*/
function smallCopy(){
    fs.readdir("../cat",(err,files)=>{
        files.forEach((file)=>{
            let fileUrl = path.join("../cat",file);
            if(fs.statSync(fileUrl).isDirectory()){
                smallCopy();
            }else{
                fs.readFile(fileUrl,(err,data)=>{
                    fs.writeFile(absoluteUrl+"/"+file,data,(err)=>{
                        if(err)console.log(err);
                        console.log("copy success");
                    });
                })
            }
        });
    });
}
/*大型文件的拷贝，运用事件流，读一点写一点的方式*/ 
// 只是说面有读取 流这个方式 ，有这种复制大文件的思想，这里没有去实现
function bigCopy(){
    let a = fs.createReadStream("../cat/a1.js");/*.pipe(fs.createWriteStream(absoluteUrl+"/cat.js"));*/
    let b = fs.createWriteStream(absoluteUrl+"/cat.js");    
    a.on("data",function(data){
        if(b.write(data)){
            fs.pause();
        }
    });
    a.on("end",function(end){
        console.log("完成了");
    });
}
bigCopy();