const jade = require("jade");

const str = jade.renderFile("./www/jade1.jade",{pretty:true,test:1});
console.log(str);