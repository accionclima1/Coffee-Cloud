var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
var Message = mongoose.model('Message');
var passport = require('passport');
var User = mongoose.model('User');
var Method = mongoose.model('Method');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET Admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });

});

/* GET message jsons. */
router.get('/chats', function(req, res, next) {
  Chat.find(function(err, chats){
    if(err){ return next(err); }
	
    res.json(chats);
  });
});

/* Methods routes */

router.post('/methods', auth, function(req, res, next) {
  var method = new Method(req.body);
  method.caseInidence10.abrilJunio		   = req.body.caseInidence10.abrilJunio;
  method.caseInidence10.julioSetiembre	   = req.body.caseInidence10.julioSetiembre 
  method.caseInidence10.octubreDiciembre   = req.body.caseInidence10.octubreDiciembre; 
  method.caseInidence1120.abrilJunio	   = req.body.caseInidence1120.abrilJunio;
  method.caseInidence1120.julioSetiembre   = req.body.caseInidence1120.julioSetiembre;
  method.caseInidence1120.octubreDiciembre = req.body.caseInidence1120.octubreDiciembre;
  method.caseInidence2150.abrilJunio       = req.body.caseInidence2150.abrilJunio;
  method.caseInidence2150.julioSetiembre   = req.body.caseInidence2150.julioSetiembre;
  method.caseInidence2150.octubreDiciembre = req.body.caseInidence2150.octubreDiciembre;
  method.caseInidence50.abrilJunio		   = req.body.caseInidence50.abrilJunio;
  method.caseInidence50.julioSetiembre	   = req.body.caseInidence50.julioSetiembre;
  method.caseInidence50.octubreDiciembre   = req.body.caseInidence50.octubreDiciembre;

  method.save(function(err, method){
    if(err){ return next(err); }
	
    res.json(method);
  });
});

router.get('/methods', function(req, res, next) {
  Method.find(function(err, methods){
    if(err){ return next(err); }
	
    res.json(methods);
  });
});

router.put('/methods', auth, function(req, res, next) {
   var update = req.body;
  Method.findById(req.body._id, function(err, method ) {
  if (!method)
    return next(new Error('Could not load Document'));
  else {
    // do your updates here
      method.caseInidence10.abrilJunio		   = req.body.caseInidence10.abrilJunio;
	  method.caseInidence10.julioSetiembre	   = req.body.caseInidence10.julioSetiembre 
	  method.caseInidence10.octubreDiciembre   = req.body.caseInidence10.octubreDiciembre; 
	  method.caseInidence1120.abrilJunio	   = req.body.caseInidence1120.abrilJunio;
	  method.caseInidence1120.julioSetiembre   = req.body.caseInidence1120.julioSetiembre;
	  method.caseInidence1120.octubreDiciembre = req.body.caseInidence1120.octubreDiciembre;
	  method.caseInidence2150.abrilJunio       = req.body.caseInidence2150.abrilJunio;
	  method.caseInidence2150.julioSetiembre   = req.body.caseInidence2150.julioSetiembre;
	  method.caseInidence2150.octubreDiciembre = req.body.caseInidence2150.octubreDiciembre;
	  method.caseInidence50.abrilJunio		   = req.body.caseInidence50.abrilJunio;
	  method.caseInidence50.julioSetiembre	   = req.body.caseInidence50.julioSetiembre;
	  method.caseInidence50.octubreDiciembre   = req.body.caseInidence50.octubreDiciembre;
	
    method.save(function(err) {
      if (err)
        console.log('error');
      else
      	console.log(method);
        res.json(method);
    });
  }
});
});


module.exports = router;








