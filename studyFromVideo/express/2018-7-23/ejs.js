const ejs = require("ejs");

ejs.renderFile("./www/ejs1.ejs",{name:"测试",arr:[1,2,4],admin:true},{},(err,data)=>{
    if(err) {console.log(err);return};
    console.log(data);
});