const EventEmiter = require("events");

// module.exports = new EventEmiter();

let a = 1;
setTimeout(()=>{
    // module.exports.emit("ready");
    a++;
    console.log(a);
    module.exports.a = a;
    // console.log(module.exports.emit);
},1000);

module.exports.a = a;
