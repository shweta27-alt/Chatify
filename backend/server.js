const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
const cors = require('cors')
const mongo = require('./mongoose.init');
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
mongo.connect();


app.use(require('cookie-parser')());
app.use(bodyParser.json({ limit: '2mb' }));

//cors to allow origin and methods
app.use(
    cors({
      origin:[ "http://localhost:8081","http://localhost:5080","https://webchatapplication-chatify.fly.dev"],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
      sameSite: 'none'
    })
  );

require('./app/routes')(app);

const __dirname1 = path.resolve();
  console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//other than above routes
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});


const server = app.listen(process.env.PORT||8080,console.log('server started on PORT 5080'))
//add a cors origin here for the socket 
const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:[ "http://localhost:8081","http://localhost:5080","https://webchatapplication-chatify.fly.dev"]

  }
})
//create a connection between client server
io.on('connection',(socket)=>{
    console.log('connected to socket.io');
    //take user data from frontend and join the group with user id
    socket.on('setup',(userData)=>{
      socket.join(userData._id);
      socket.emit('connected'); 
    })
  //create a room with the room id sent from frontend
    socket.on('join chat',(room)=>{
      socket.join(room);
    })
    //to read and emit the typing event from frontend socket
    socket.on('typing',(room)=>socket.in(room).emit('typing'));
    //to read the emit stop typing event from frontend socket
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));
    //to read the new message from frontend socket
    socket.on('new message',(newMessageRecieved)=>{
      let chat = newMessageRecieved.chat;
      if(!chat.users) return console.log('chat users not defined')
      //check if message received sender id match with any of the user we return it otherwise we emit the message to other user 
      chat.users.forEach(user => {
        if(user._id == newMessageRecieved.sender._id) return; 
        socket.in(user._id).emit("message received",newMessageRecieved)
       });
       
    })
})
 
