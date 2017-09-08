const path = require('path');
const publicPath = path.join(__dirname,"../public");
const http = require('http');
const socketIO = require('socket.io')
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
//to setup socket.io
var server = http.createServer(app);
//server to use socket.io
var io = socketIO(server);

//listens to the events
io.on('connection',(socket)=>{
    console.log("New user connected"); 

    socket.emit('newMessage',{
        from:"Admin",
        text:"Welcome to chat app",
        createdAt:new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text:"New user joined",
        createdAt:new Date().getTime()
    })

    socket.on('createMessage',(message)=>{
        console.log("Create message",message);
        //io.emit broadcasts the event including the user who initialted it
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
        //broadcasts the event execpt the user who initialted it
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });
    
    socket.on('disconnect',()=>{
        console.log("Disconnected from User");
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})