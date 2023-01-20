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


app.listen(5080,console.log('server started on PORT 5080'))
 
