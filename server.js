console.log('Now the value for FOO is:', process.env.FOO);

const express = require('express');
const bodyParser = require('body-parser');

//create an express app
const app = express();

//parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse request of content-type - application/json
app.use(bodyParser.json())

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
app.listen(process.env.PORT || 3000, () => {
	console.log("server is listening on port 3030");
})