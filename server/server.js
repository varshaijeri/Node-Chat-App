const path = require('path');
const publicPath = path.join(__dirname,"../public");
const http = require('http');
const socketIO = require('socket.io')
const express = require('express');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
//to setup socket.io
var server = http.createServer(app);
//server to use socket.io
var io = socketIO(server);
var users = new Users();

//listens to the events
io.on('connection',(socket)=>{
    console.log("New user connected"); 

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage("Admin","Welcome to chat app"));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined`));
        callback();
    });

    socket.on('createMessage',(message,callback)=>{
        var user = users.getUser(socket.id);
        //check whether text is a string so that no empty field text
        if(user && isRealString(message.text)){
            //io.emit broadcasts the event including the user who initialted it
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
    });

    socket.on('createLocationMessage',(cords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,cords.latitude,cords.longitude));
        }
    });
    
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage("Admin",`${user.name} has left`));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})