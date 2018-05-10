const express = require('express');
const bodyParser = require('body-parser');

//create an express app
const app = express();

//parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse request of content-type - application/json
app.use(bodyParser.json())

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, judge, category");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
	.then(()=>{
		console.log("Successfully connected to the database");
	}).catch(err => {
		console.log("Could not connect to the database");
		process.exit();
	})
//a simple route
app.get('/',(req, res)=>{
	res.json({"message":"Welcome to the HUJE application"});
})

// require judge routes
require('./app/routes/judge.routes.js')(app);

// require question routes
require('./app/routes/question.routes.js')(app);

// listen for requests
app.listen(process.env.PORT || 3030, () => {
	console.log("server is listening on port 3030");
})