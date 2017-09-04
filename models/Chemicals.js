var mongoose = require('mongoose');

var ChemicalsSchema = new mongoose.Schema({
	name: String
});

mongoose.model('Chemicals', ChemicalsSchema);