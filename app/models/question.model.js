const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
	questions: [{
		label: String,
		qtype: String,
		searchfor: String,
		qvalue: String
	}],
	joptions: {
		jtype:String,
		jvalues:[{
			color: String,
			value: String
		}]
	},
	judgments:[{
			judge:String,
			judgment:String,
			insertts:{type : Date, default: Date.now}
		}]
}, {
	timestamps: true
});

// the timestamps option above adds two fields createdAt and updatedAt to the schema 

module.exports = mongoose.model('Question', QuestionSchema);