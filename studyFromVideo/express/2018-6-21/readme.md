2018/7/16

1、
const server = express();
2、
server.listen(8080);
3、
server.use("地址",(req,res)=>{});

在 express 中 存在 链式操作

server.use("地址",(req,res,next)=>{
    console.log("a");
    <!-- 如果 你想 在同一个 地址下 进行链式 操作,允许下一个相同 匹配的 路径 执行 (就是指 即打印 a 也要打印 下面的 b)  -->
    next();
});

server.use("地址",(req,res,next)=>{
    console.log("b");
    <!-- 如果 你想  -->
});

想在 所有的 地址下都 运行这个并且不影响其他 操作的写法：

server.use((req,res,next)=>{

    next();
});