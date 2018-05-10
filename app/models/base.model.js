const mongoose = require('mongoose');

const baseOptions = {
	discriminatorKey: '__type',
	collection: 'HUJE',
	timestamps: true
}

module.exports =  mongoose.model('HUJE', new mongoose.Schema({}, baseOptions));
