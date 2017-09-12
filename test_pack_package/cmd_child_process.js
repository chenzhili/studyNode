/**
 * Created by YK on 2017/9/12.
 */
let execSync = require('child_process').execSync;
let cmd = "ionic -v";
let test = execSync(cmd,[]); /*用其他的运行不起???,spawn只能运行指定的程序，这里有限制*/
console.log(test);
if(test){
    console.log(1);
}

