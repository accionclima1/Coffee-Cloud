var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
  nombre: String,
  altitud: String,
  georeferencia: String,
  ubicacion: String,
  areaTotal: String,
  areaCafe: String,
  lote: String,
  edadLote: String,
  variedad: String,
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
  fungicidas: String,
  fungicidasFechas: String,
  verificaAgua: Boolean,
  verificaAguaTipo: String,
  rendimiento: String,
  floracionPrincipal: String,
  inicioCosecha:Date,
  finalCosecha:Date, 
  epocalluviosa:Date,
  FinEpocalluviosa:Date,
  tipoCafe: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
    timestamps: true
});

mongoose.model('Unit', UnitSchema);