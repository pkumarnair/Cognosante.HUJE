const mongoose = require('mongoose');
const Base = require("./base.model.js");


const JudgeSchema = mongoose.Schema({
	name: String,
	contact:[{contype: String, convalue: String}],
	categories:[{name:String}]
});

/*
const JudgeSchema = mongoose.Schema({
	name: String,
	contact:[{contype: String, convalue: String}],
	tasks:[{id:String, name:String}]
}, {
	timestamps: true
});
*/
// the timestamps option above adds two fields createdAt and updatedAt to the schema 

//module.exports = mongoose.model('Judge', JudgeSchema);

module.exports = Base.discriminator('Judge', JudgeSchema);