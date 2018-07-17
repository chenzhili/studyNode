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

2018/7/17
1、cookie
    cookie-parser
    发送：是 express 自带 就可以发送 res.cookie()
    读取:需要用到上面的中间件，并且可以 冒泡到他的所有祖先上  可以 访问，其他不行 
2、session
    cookie-session

    session的理解：是基于 cookie
    其实 session 是 存于 后台 并且跟前台有所 交互的 一个数据，他其实 是变向的 cookie，在客户端只是 存储了 一个有关的 sessionid 以及 对于这个 id的 签名 数据，不存在真是的数据，后台得到 这个数据在 进行解析判断 看是否有更改；