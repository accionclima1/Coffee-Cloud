var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Unit = mongoose.model('Unit');
var Comment = mongoose.model('Comment');
var passport = require('passport');
var User = mongoose.model('User');
var Method = mongoose.model('Method');
var Campo = mongoose.model('Campo');
var Roya = mongoose.model('Roya');
var Gallo = mongoose.model('Gallo');
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage }).single('userPhoto');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.title = req.body.title;
  post.content = req.body.content;
  
  post.save(function(err, post){
    if(err){ return next(err); }
	console.log(post);
    res.json(post);
  });
});

router.post('/upload/photo',  function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

router.put('/posts/:post', auth, function(req, res, next) {
  var update = req.body;
  Post.findById(req.body._id, function(err, post ) {
  if (!Post)
    return next(new Error('Could not load Document'));
  else {
    post.title = req.body.title;
    post.content = req.body.content;
    post.save(function(err) {
      if (err)
        console.log('error');
      else
        res.json({message: '¡Noticia Actualizado exitosamente!'});
    });
  }
});
});


router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});


router.param('comment', function (req, res, next, id) {
    var query = Comment.findById(id);
    query.exec(function (err, comment) {
        if (err) {return next(err); }
        if (!comment) { return next(new Error("Cannot find comment!")); }
        req.comment = comment;
        return next();
    });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//comment upvotes
router.put('/posts/:post/comments/:comment/upvote', auth, function (req, res, next) {
    req.comment.upvote(function (err, comment) {
        if (err) { return next(err) }
        res.json(comment);
    });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.email ){
    return res.status(400).json({message: 'Por favor, llene todos los campos'});
  }
    console.log(req.body)
  var user = new User();

  user.username = req.body.username;
  
  user.email = req.body.email;
  
  user.phone = req.body.phone;

  user.setPassword(req.body.password);
  
  user.extemDepartamento = req.body.departamento;
  
  user.exteMunicipio = req.body.municipio;
  
  //user.recomendaciontecnica = req.body.recomendaciontecnica;
  
  user.role = req.body.role;

 
  user.save(function (err){
    if(err){ return res.status(500).json({message: 'Usuario o Correo ya an sido registrados'}) }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Por favor, llene todos los campos'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.param('user', function(req, res, next, id) {
  var query = User.findById(id);
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});

router.param('unit', function(req, res, next, id) {
  var query = Unit.findById(id);
  query.exec(function (err, unit){
    if (err) { return next(err); }
    if (!unit) { return next(new Error('can\'t find unit')); }
    
    req.unit = unit;
    return next();
  });
});

router.param('test', function(req, res, next, id) {
  var query = Roya.findById(id);
  query.exec(function (err, test){
    if (err) { return next(err); }
    if (!test) { return next(new Error('can\'t find test')); }
    
    req.test = test;
    return next();
  });
});

router.post('/users/:user/units', auth, function(req, res, next) {
  var unit = new Unit(req.body);

  //post.author = req.payload.username;
  	 unit.nombre = req.body.nombre;
     unit.altitud = req.body.altitud; 
     unit.departamento = req.body.departamento;
	   unit.municipio = req.body.municipio;
     unit.ubicacion = req.body.ubicacion;
     unit.areaTotal = req.body.areaTotal;
     unit.areaCafe = req.body.areaCafe ;
     unit.lote = req.body.lote;
     unit.edadLote = req.body.edadLote;
     unit.variedad = req.body.variedad;
     unit.distanciamiento = req.body.distanciamiento;
     unit.sombra = req.body.sombra;
     unit.muestreo = req.body.muestreo;
     unit.muestreoMes = req.body.muestreoMes;
     unit.fertilizaSuelo = req.body.fertilizaSuelo;
     unit.fertilizaSueloMes = req.body.fertilizaSueloMes;
     unit.fertilizaFollaje = req.body.fertilizaFollaje;
     unit.fertilizaFollajeMes = req.body.fertilizaFollajeMes;
     unit.enmiendasSuelo = req.body.enmiendasSuelo;
     unit.enmiendasSueloMes = req.body.enmiendasSueloMes;
     unit.manejoTejido = req.body.manejoTejido;
     unit.manejoTejidoMes = req.body.manejoTejidoMes;
     unit.fungicidasRoya = req.body.fungicidasRoya;
     unit.fungicidas = req.body.fungicidas;
     unit.fungicidasFechas = req.body.fungicidasFechas;
     unit.verificaAguaTipo = req.body.verificaAguaTipo ;
     unit.rendimiento = req.body.rendimiento;
     unit.floracionPrincipal = req.body.floracionPrincipal;
     unit.inicioCosecha = req.body.inicioCosecha;
     unit.finalCosecha = req.body.finalCosecha;
     unit.epocalluviosa = req.body.epocalluviosa;
     unit.FinEpocalluviosa = req.body.FinEpocalluviosa;
     unit.recomendaciontecnica = req.body.recomendaciontecnica;
     unit.tipoCafe = req.body.tipoCafe;
     unit.user = req.user;
     
  // console.log(req.user);
  unit.save(function(err){
  	if(err){ return res.status(500).json({message: err}); }
  	req.user.units.push(unit);
    req.user.save(function(err, post) {
      if(err){ return next(err); }

      console.log(unit);
	  res.json(unit);
    });
  	
  });
});

router.get('/users/:user/units/', function(req, res, next) {
  Unit.find(function(err, units){
    if(err){ return next(err); }

    res.json(units);
  });
});

router.get('/users/:user/units/:unit', function(req, res) {
    res.json(req.unit);
});

router.put('/users/:user/units/:unit', auth, function(req, res, next) {
	  var update = req.body;
	  Unit.findById(req.body._id, function(err, unit ) {
	  if (!unit)
	    return next(new Error('Could not load Document'));
	  else {
	     unit.nombre = req.body.nombre;
	     unit.altitud = req.body.altitud; 
	     unit.departamento = req.body.departamento;
		 unit.municipio = req.body.municipio;
	     unit.ubicacion = req.body.ubicacion;
	     unit.areaTotal = req.body.areaTotal;
	     unit.areaCafe = req.body.areaCafe ;
	     unit.lote = req.body.lote;
	     unit.edadLote = req.body.edadLote;
	     unit.variedad = req.body.variedad;
	     unit.distanciamiento = req.body.distanciamiento;
	     unit.sombra = req.body.sombra;
	     unit.muestreo = req.body.muestreo;
	     unit.muestreoMes = req.body.muestreoMes;
	     unit.fertilizaSuelo = req.body.fertilizaSuelo;
	     unit.fertilizaSueloMes = req.body.fertilizaSueloMes;
	     unit.fertilizaFollaje = req.body.fertilizaFollaje;
	     unit.fertilizaFollajeMes = req.body.fertilizaFollajeMes;
	     unit.enmiendasSuelo = req.body.enmiendasSuelo;
	     unit.enmiendasSueloMes = req.body.enmiendasSueloMes;
	     unit.manejoTejido = req.body.manejoTejido;
	     unit.manejoTejidoMes = req.body.manejoTejidoMes;
	     unit.fungicidasRoya = req.body.fungicidasRoya;
	     unit.fungicidas = req.body.fungicidas;
	     unit.fungicidasFechas = req.body.fungicidasFechas;
	     unit.verificaAguaTipo = req.body.verificaAguaTipo ;
	     unit.rendimiento = req.body.rendimiento;
	     unit.floracionPrincipal = req.body.floracionPrincipal;
	     unit.inicioCosecha = req.body.inicioCosecha;
	     unit.finalCosecha = req.body.finalCosecha;
	     unit.epocalluviosa = req.body.epocalluviosa;
	     unit.FinEpocalluviosa = req.body.FinEpocalluviosa;
       unit.recomendaciontecnica = req.body.recomendaciontecnica;
	     unit.tipoCafe = req.body.tipoCafe;
	      
	    unit.save(function(err) {
	      if (err)
	        console.log('error');
	      else
	      	console.log(unit);
	        res.json(unit);
	    });
	  }
	});
});

router.delete('/users/:user/units/:unit', auth, function (req, res) {
	Unit.findByIdAndRemove(req.params.unit, function (err,unit){
    if(err) { throw err; }
		var search_term = req.params.unit;
		
		for (var i=req.user.units.length-1; i>=0; i--) {
		    if (req.user.units[i] === search_term) {
		        req.user.units.splice(i, 1);
		        // break;       //<-- Uncomment  if only the first term has to be removed
		    }
		}
		
        req.user.save(function(err, post) {
			if(err){ return next(err); }
    	
	    res.json({messageUnit: "Unidad eliminada"});
	    
	    });
	});
  
});

router.get('/users', auth, function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

router.get('/users/:user', function(req, res, next) {
  req.user.populate('units', function(err, user) {
    if (err) { return next(err); }
	//console.log(user);
    res.json(user);
  });
});

router.put('/users/:user', auth, function (req, res, next) {
    var update = req.body;

    User.findById(req.body._id, function(err, user ) {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            user.email = req.body.email;
	        user.phone = req.body.phone;
	        user.role = req.body.role;

          user.nickname = req.body.nickname;
	        //user.recomendaciontecnica = req.body.recomendaciontecnica;
	        user.image = req.body.image;

            if (req.body.password) {
                user.setPassword(req.body.password);
	        };
	
	        user.save(function (err) {
                if (err)
                    console.log('error');
                else
                    res.json({message: '¡Perfil Actualizado exitosamente!'});
            });
        }
    });
});

router.delete('/users/:user', auth, function (req, res) {
	User.findByIdAndRemove(req.params.user, function (err,user){
    if(err) { throw err; }
		
    	
	    res.json({messageUnit: "Usuario eliminado!"});
	    console.log("Usuario eliminado!");
	});
  
});

//ROYA TEST ROUTES!
router.post('/roya', auth, function(req, res, next) {
	console.log(req);
  var roya = new Roya(req.body);
    roya.advMode = req.body.advMode;
    roya.bandolas = req.body.bandolas;
	roya.resolved = req.body.resolved;
	roya.user = req.body.user;
	roya.plantas = req.body.plantas;
	roya.unidad = req.body.unidad;
	roya.incidencia = req.body.incidencia;
	roya.inideanciaPromedioPlanta = req.body.avgplnt;
	roya.severidadPromedio = req.body.avgplntDmgPct;
  
  roya.save(function(err, roya){
    if(err){ return next(err); }
	console.log(roya);
    res.json(roya);
  });
});

router.get('/roya', function(req, res, next) {
  Roya.find(function(err, royas){
    if(err){ return next(err); }

    res.json(royas);
  });
});

router.post('/gallo', auth, function(req, res, next) {
	console.log(req);
  var gallo = new Gallo(req.body);
    gallo.advMode = req.body.advMode;
    gallo.bandolas = req.body.bandolas;
	gallo.resolved = req.body.resolved;
	gallo.user = req.body.user;
	gallo.plantas = req.body.plantas;
	gallo.unidad = req.body.unidad;
	gallo.incidencia = req.body.incidencia;
	gallo.inideanciaPromedioPlanta = req.body.avgplnt;
	gallo.severidadPromedio = req.body.avgplntDmgPct;
  
  roya.save(function(err, gallo){
    if(err){ return next(err); }
	console.log(gallo);
    res.json(gallo);
  });
});

router.get('/gallo', function(req, res, next) {
  Gallo.find(function(err, gallo){
    if(err){ return next(err); }

    res.json(gallo);
  });
});

router.delete('/roya/:test', auth, function (req, res) {
	Roya.findByIdAndRemove(req.params.test, function (err,test){
    if(err) { throw err; }
	    res.json({messageUnit: "Test eliminado!"});
	    console.log("Test eliminado!");
	});
  
});

router.get('/technico/units', function(req, res, next) {
  console.log("hie")
  Unit.find(function(err, units){
    if(err){ return next(err); }

    res.json(units);
  });
});

module.exports = router;


















