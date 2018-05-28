var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
    PouchDBId: String,
    LastUpdatedDateTime: Number,
    EntityType:String,
    isSync: Boolean,
    isDeleted: Boolean,
    nombre: String,
    altitud: String,
    departamento: String,
    municipio: String,
    ubicacion: String,
    areaTotal: String,
    areaCafe: String,
    lote: { type: Array, "default": [] },
    variedad: { type: Array, "default": [] },
    typeOfCoffeProducessOptionSelected: { type: Array, "default": [] },
    distanciamiento: String,
    sombra: Boolean,
    muestreo: Boolean,
    muestreoMes: { type: Array, "default": [] },
    fertilizaSuelo: Boolean,
    fertilizaSueloMes: { type: Array, "default": [] },
    fertilizaFollaje: Boolean,
    fertilizaFollajeMes: { type: Array, "default": [] },
    enmiendasSuelo: Boolean,
    enmiendasSueloMes: { type: Array, "default": [] },
    manejoTejido: Boolean,
    manejoTejidoMes: { type: Array, "default": [] },
    fungicidasRoya: Boolean,
    fungicidas: {
        contacto: Boolean,
        biologico: Boolean,
        sistemico: Boolean,
        bourbon: Boolean,
        catuai: Boolean,
        contactoOptionsMonths: {
            caldovicosa: String,
            caldobordeles: String,
            otrocual: String,
        },
        contactoOptions: {
            caldovicosa: Boolean,
            caldobordeles: Boolean,
            otrocual: Boolean,
            cual: String,
        },
        biologicalOptionsMonths: {
            verticiliumlecanii: String,
            bacilussutillis: String,
            otrocual: String,
        },
        biologicalOptions: {
            verticiliumlecanii: Boolean,
            bacilussutillis: Boolean,
            otrocual: Boolean,
            cual: String,
        },

        sistemicoOptionsMonths: {
            opus: String,
            opera: String,
            esferamax: String,
            amistarxtra: String,
            alto10: String,
            silvacur: String,
            verdadero: String,
            otrocual: String,
            mancuerna: String,
            caporal: String,
            halt: String,
            astrostarxtra: String,
            tutela: String,
            halconextra: String,
            beken: String,
            estrobirulina: String,
            otro: String
        },
        sistemicoOptions: {
            opus: Boolean,
            opera: Boolean,
            esferamax: Boolean,
            amistarxtra: Boolean,
            alto10: Boolean,
            silvacur: Boolean,
            verdadero: Boolean,
            otrocual: Boolean,
            mancuerna: Boolean,
            caporal: Boolean,
            halt: Boolean,
            astrostarxtra: Boolean,
            tutela: Boolean,
            halconextra: Boolean,
            beken: Boolean,
            estrobirulina: Boolean,
            otro: Boolean,
            cual: String,
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
    inicioCosecha: String,
    finalCosecha: String,
    epocalluviosa: String,
    FinEpocalluviosa: String,
    recomendaciontecnica: String,
    nitrogeno: Boolean,
    nitrorealiza: { type: Array, "default": [] },
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
