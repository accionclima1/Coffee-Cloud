var mongoose = require('mongoose');

var ChemicalsSchema = new mongoose.Schema({
	name: String,
	category: String
});

mongoose.model('Chemicals', ChemicalsSchema);