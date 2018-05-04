const mongoose = require('mongoose');

const JudgeSchema = mongoose.Schema({
	name: String,
	contact:[{contype: String, convalue: String}]
}, {
	timestamps: true
});

// the timestamps option above adds two fields createdAt and updatedAt to the schema 

module.exports = mongoose.model('Judge', JudgeSchema);