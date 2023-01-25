const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
const cors = require('cors')
const mongo = require('./mongoose.init');
mongo.connect();


app.use(require('cookie-parser')());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(
    cors({
      origin:[ "http://localhost:8081","http://localhost:8080"],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
      sameSite: 'none'
    })
  );

require('./routes')(app);

//other than above routes
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});


const server = app.listen(5080,console.log('server started on PORT 5080'))

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:'http://localhost:8080'

  }
})

io.on('connection',(socket)=>{
    console.log('connected to socket.io');
    socket.on('setup',(userData)=>{
      console.log(userData._id)
      socket.join(userData._id);
      socket.emit('connected'); 
    })

    socket.on('join chat',(room)=>{
      socket.join(room);
      console.log('user joined the room',room);
    })

    socket.on('typing',(room)=>socket.in(room).emit('typing'))
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))
    socket.on('new message',(newMessageRecieved)=>{
      console.log(newMessageRecieved);
      let chat = newMessageRecieved.chat;
      if(!chat.users) return console.log('chat users not defined')

      chat.users.forEach(user => {
        if(user._id == newMessageRecieved.sender._id) return;
        console.log(user);
        socket.in(user._id).emit("message recived",newMessageRecieved)
        
      });
       
    })
})
 
