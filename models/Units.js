var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
  nombre: String,
  altitud: String,
  departamento: String,
  municipio: String,
  ubicacion: String,
  areaTotal: String,
  areaCafe: String,
  lote: String,
  edadLote: String,
  variedad: {
	  	caturra: Boolean,
	  	bourbon: Boolean,
	  	catuai: Boolean,
	  	maragogype: Boolean,
	  	typica: Boolean,
	  	pacamara: Boolean,
	  	pacheComun: Boolean,
	  	pacheColis: Boolean,
	  	mundoNovo: Boolean,
	  },
  distanciamiento: String,
  sombra: Boolean,
  muestreo: Boolean,
  muestreoMes: String,
  fertilizaSuelo: Boolean,
  fertilizaSueloMes: String,
  fertilizaFollaje: Boolean,
  fertilizaFollajeMes: String,
  enmiendasSuelo: Boolean,
  enmiendasSueloMes: String,
  manejoTejido: Boolean,
  manejoTejidoMes: String,
  fungicidasRoya: Boolean,
  fungicidas: {
	  	contacto: Boolean,
	  	biologico: Boolean,
	  	sistemico: Boolean
	  },
  fungicidasFechas: String,
  verificaAgua: Boolean,
  verificaAguaTipo: {
	  ph: Boolean,
	  dureza: Boolean,
  },
  rendimiento: String,
  floracionPrincipal: String,
  inicioCosecha:Date,
  finalCosecha:Date, 
  epocalluviosa:Date,
  FinEpocalluviosa:Date,
  recomendaciontecnica: String,
  tipoCafe: {
	  estrictamenteDuro: Boolean,
	  duro: Boolean,
	  semiduro: Boolean,
	  prime: Boolean,
	  extraprime: Boolean
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
    timestamps: true
});

mongoose.model('Unit', UnitSchema);