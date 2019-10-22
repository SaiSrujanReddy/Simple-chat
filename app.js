const express = require("express");
const app = express();

app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

const server = app.listen(3000,()=>{
    console.log('server is started');
});


app.get('/',(req,res)=>{
    res.render("index.ejs");
});

const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    console.log("user Connected")
    socket.emit(`Hello Welcome`);
    socket.on('my other event', (data) =>{
    console.log(data)
    });

    socket.username="anonymous";

    socket.on('change_username',(data)=>{
        socket.username=data.username;
    });
    
    //listen on messages
    socket.on('new_message', (data)=>{
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen to typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })

});
