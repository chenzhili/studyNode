socket.io
1、客户端
客户端只能 发送当前用户 对应的信息，不存在 多种不同的 发送方式，这个只存在于 服务端；

只有 发送 和接收 数据 以及 断开连接；


2、服务端
服务端发送 数据 可以 针对 不同的 范围 分 多种情况

// send to current request socket client
socket.emit('message', "this is a test");
 
// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");
 
// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');
 
// sending to all clients, include sender
io.sockets.emit('message', "this is a test");
 
// sending to all clients in 'game' room(channel), include sender
io.sockets.in('game').emit('message', 'cool game');
 
// sending to individual socketid（这个好像废弃了）
io.sockets.socket(socketid).emit('message', 'for your eyes only');
