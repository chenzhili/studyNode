/**
 * Created by YK on 2017/9/22.
 */
let fs = require("fs");
let path = require("path");
let absoluteUrl = process.cwd();
function copy(){
    fs.readdir("../cat",(err,files)=>{
        files.forEach((file)=>{
            let fileUrl = path.join("../cat",file);
            if(fs.statSync(fileUrl).isDirectory()){
                copy();
            }else{
                fs.readFile(fileUrl,(err,data)=>{
                    fs.writeFile(absoluteUrl,data,(err)=>{
                        if(err)console.log(err);
                    });
                })
            }
        });
    });
}
copy();