//Node server which wil handle the socket io connections
require('dotenv').config();

const PORT=process.env.PORT
const io=require('socket.io')(PORT);

console.log(`PORT: ${PORT}`);

const users={};

io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{
        //console.log('new-user',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
