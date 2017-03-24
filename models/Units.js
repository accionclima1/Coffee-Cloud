var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
  PouchDBId:String,
  isSync:Boolean,
  isDeleted:Boolean,
  nombre: String,
  altitud: String,
  departamento: String,
  municipio: String,
  ubicacion: String,
  areaTotal: String,
  areaCafe: String,
  lote: { type : Array , "default" : [] },
    // edadLote: String,
  variedad: {
              Catimor5175: Boolean,
              Sarchimor: Boolean,
              Anacafe14: Boolean,
              Anacafe90: Boolean,
              CostaRica95: Boolean,
              Lempira: Boolean,
              Obata: Boolean,
              Catucai: Boolean,
              HibridoH1: Boolean,
              Marsellesa: Boolean,
              Tupi: Boolean,
              Parainema: Boolean,
              CatuaiAmarillo: Boolean,
              CatuaiRojo: Boolean,
              Caturra: Boolean,
              Pacamara: Boolean,
              Pachecolis: Boolean,
              Geisha: Boolean,
              Bourbon: Boolean,
              Pachecomun: Boolean,
              Pacas: Boolean,
              Robusta: Boolean,
              MundoNovo: Boolean,
              VillaSarchi: Boolean,
              Maragogype: Boolean,
              Typica: Boolean,
              Maracaturra: Boolean,
              Otra: Boolean,
              Cual: String,
	  },
  typeOfCoffeProducessOptionSelected:{ type : Array , "default" : [] },  
  distanciamiento: String,
  sombra: Boolean,
  muestreo: Boolean,
  muestreoMes: { type : Array , "default" : [] },
  fertilizaSuelo: Boolean,
  fertilizaSueloMes: { type : Array , "default" : [] },
  fertilizaFollaje: Boolean,
  fertilizaFollajeMes: { type : Array , "default" : [] },
  enmiendasSuelo: Boolean,
  enmiendasSueloMes: { type : Array , "default" : [] },
  manejoTejido: Boolean,
  manejoTejidoMes: { type : Array , "default" : [] },
  fungicidasRoya: Boolean,
  fungicidas: {
	  	contacto: Boolean,
	  	biologico: Boolean,
	  	sistemico: Boolean,
      bourbon: Boolean,
      catuai: Boolean,
      contactoOptionsMonths:{
        caldovicosa : String,
        caldobordeles:String,
        otrocual:String,
      },
      contactoOptions: {
        caldovicosa : Boolean,
        caldobordeles:Boolean,
        otrocual:Boolean,
      },
      biologicalOptionsMonths:{
			 	verticiliumlecanii:String,
		 		bacilussutillis:String,
		 		otrocual:String,
		 },
      biologicalOptions:{
			 	verticiliumlecanii:Boolean,
		 		bacilussutillis:Boolean,
		 		otrocual:Boolean,
		 },
     
     sistemicoOptionsMonths:{
        opus:String,
        opera:String,
        esferamax:String,
        amistarxtra:String,
        alto10:String,
        silvacur:String,
        verdadero:String,
        otrocual:String,
        mancuerna:String,
        caporal:String,
        halt:String,
        astrostarxtra:String,
        tutela:String,
        halconextra:String,
        beken:String,
        estrobirulina:String,
        otro:String
		 },
     sistemicoOptions:{
        opus:Boolean,
        opera:Boolean,
        esferamax:Boolean,
        amistarxtra:Boolean,
        alto10:Boolean,
        silvacur:Boolean,
        verdadero:Boolean,
        otrocual:Boolean,
        mancuerna:Boolean,
        caporal:Boolean,
        halt:Boolean,
        astrostarxtra:Boolean,
        tutela:Boolean,
        halconextra:Boolean,
        beken:Boolean,
        estrobirulina:Boolean,
        otro:Boolean
		 }
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
  nitrogeno : Boolean,
  nitrorealiza: { type : Array , "default" : [] },
  sacos: String,
  realizapoda: Boolean,
  realizamonth: String,
  quetipo: String,
  enfermedades: Boolean,
  cyprosol: Boolean,
  cyprosoldate: String,
  atemi: Boolean,
  atemidate: String,
  esfera: Boolean,
  esferadate: String,
  opera: Boolean,
  operadate: String,
  opus: Boolean,
  opusdate: String,
  soprano: Boolean,
  sopranodate: String,
  hexalon: Boolean,
  hexalondate: String,
  propicon: Boolean,
  propicondate: String,  
  hexil: Boolean,
  hexildate: String,   
  otros: String,
  otrosdate: String,
  fungicidasmonth: String,
  realizamanejoTejidoMes: String,
  produccionhectarea: String,
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