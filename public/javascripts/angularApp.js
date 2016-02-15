var app = angular.module('coffeeScript', ['btford.socket-io','ui.router','snap','luegg.directives','LocalStorageModule']);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

// Socket Factory service
app.factory('socket', ['socketFactory',
    function(socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('http://localhost:3000')
        });
    }
]);

app.controller('MainCtrl',['$scope','posts', 'auth',
function($scope, posts, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.posts = posts.posts;
  	$scope.addPost = function(){
	  	if(!$scope.title || $scope.title === '') { return; }
		posts.create({
		    title: $scope.title,
		    link: $scope.link,
		  });
		$scope.title = '';
		$scope.link = '';
	};
	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};
	
}]);
app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
'auth',
function($scope, posts, post, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.post = post;
		$scope.addComment = function(){
			  if($scope.body === '') { return; }
			  posts.addComment(post._id, {
			    body: $scope.body,
			    author: 'user',
			  }).success(function(comment) {
			    $scope.post.comments.push(comment);
			  $scope.body = '';
			});
		};
		$scope.incrementUpvotes = function(comment){
		  posts.upvoteComment(post, comment);
		};

}]);
//Authorize Controller
app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('register-profile');
    });
  };

  $scope.registerProfile = function(){
      $state.go('location');
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
	};
}]);

app.controller('LocationCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.testLocation = function() {
  	$('body').removeClass('modal-open');
  	$('.modal-backdrop').removeClass('modal-backdrop');
  	$state.go('home');
  }
}]);

app.controller('RoyaCtrl', [
'$scope',
'$state',
'auth',
'localStorageService',
'socket',
function($scope, $state, auth, localStorageService, socket){
  $scope.currentUser = auth.currentUser;
  var currentId = auth.currentUser();
  var testInStore = localStorageService.get('localTest');
  var plantEditor = function(plant) {
	  $scope.plantname = plant;
	  $scope.leafList = $scope.test.plantas[plant - 1];
	  //console.log($scope.leafList);
	  $('.plant-editor').addClass('active');
  }
  if(testInStore) {
	  $('.roya-wrap').addClass('initiated');
  }
  $scope.test = testInStore || {
	  	advMode : false,
	  	bandolas : false,
	  	user : currentId,
	  	plantas: []	  
	  };
  $scope.$watch('test', function () {
      localStorageService.set('localTest', $scope.test);
    }, true);
	
  $scope.startTest = function($event) {
	  var eventTarget = $event.currentTarget;
	  if($(eventTarget).hasClass('adv')) {
		  $scope.test.advMode = true;
	  } else {
		  $scope.test.advMode = false;
	  }
	  $('.roya-wrap').addClass('initiated');
   }
   $scope.bandolas = function() {
	   if($scope.test.bandolas) {
		  $scope.test.bandolas = false;
	  } else {
		  $scope.test.bandolas = true;
	  }
	}
	$scope.addPlant = function() {
		$scope.test.plantas.push([]);
		var plantName = $scope.test.plantas.length;
		plantEditor(plantName);
	};
	
	$scope.editPlant = function($index) {
		plantEditor($index + 1);
		$scope.leafList = $scope.test.plantas[$index];
	}
	
	$scope.initLeaf = function() {
		$('.severity-list').addClass('active');
	}
	
	$scope.closePlant = function() {
		$('.plant-editor').removeClass('active');
	}
	
	$scope.addLeaf = function(severity) {
		var amount = $('[name=amount]').val();
		var plantIndex = $scope.plantname - 1;
		$scope.test.plantas[plantIndex].push([amount,severity]);
		$scope.leafList = $scope.test.plantas[plantIndex];
		$('[name=amount]').val(1);
		$('.severity-list').removeClass('active');
	};

    $scope.removePlant = function (index) {
      $scope.test.plantas.splice(index, 1);
    };
    
    $scope.removeLeaf = function (index) {
	  var plantIndex = $scope.plantname - 1;
      $scope.test.plantas[plantIndex].splice(index, 1);
    };  
    
    $scope.calculateTest = function() {
	
		$scope.totalPlants = $scope.test.plantas.length;
		var totalPlantitas = $scope.totalPlants;	
		var totalLeaf = 0;
		var totalIncidencePlant = [];
		var totalDamagePlant = [];
		var avgInc = 0;
		var avgPct = 0;
		
		for(var i = 0, len = $scope.totalPlants; i < len; i++) {
			var affected = 0;
			var avgDmg = 0;
			var Dmg = [];
			$.each($scope.test.plantas[i], function( index, value ) {
				  totalLeaf += parseInt(value[0]);
				  	if (value[1] !='0%') {
					   affected += parseInt(value[0]);
					   Dmg.push(parseInt(value[1]));
				  	} 
			});	
			totalIncidencePlant.push(affected);
			$.each(Dmg, function( index, value ) {
				  
				  avgDmg += parseInt(Dmg[index]);
			});
			var curAvgDmg = avgDmg / Dmg.length;
			totalDamagePlant.push(curAvgDmg);
			
		}
		var incidenceLength = totalIncidencePlant.length;
		for(var i = 0; i < incidenceLength; i++) {
		    avgInc += totalIncidencePlant[i];
		}
		var avg = avgInc / incidenceLength;
		var damageLength = totalDamagePlant.length;
		for(var i = 0; i < damageLength; i++) {
		    avgPct += totalDamagePlant[i];
		}
		var avgDmgPct = avgPct / damageLength;
		$scope.avgplnt = avg;
		$scope.avgplntDmgPct = avgDmgPct;
		$('.test').hide();
		$('.results').show();;
    };
    
    $scope.getHelp = function(plants,incidence,damage,currentUser) { 
	    var msg = 'Calculo De Roya: Plantas ' + plants + ', Incidencia ' + incidence + ', Severidad ' + damage ;
	  	 var data_server={
            message:msg,
            to_user:'admin',
            from_id:currentUser
        };
        socket.emit('get msg',data_server);
        localStorageService.remove('localTest');
    };
    
}]);

app.controller('WeatherCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.currentUser = auth.currentUser;
}]);

// Support Chat Controller 
app.controller('SupportCtrl',['$scope','auth', 'socket',
function($scope, auth, socket){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.loggedUser = auth.currentUser();
	$scope.sendMessage = function() {
		var f = $('.type-sink');
        var msg = f.find('[name=chatMsg]').val();
        var from_id = f.find('[name=fromId]').val();
		var data_server={
            message:msg,
            to_user:'admin',
            from_id:from_id
        };
        socket.emit('get msg',data_server);
        $('.type-sink .form-control').val("");
	};
	socket.on('set msg only',function(data){
        data=JSON.parse(data);
        var user = data.sender;
        if (user == $scope.loggedUser) {
	        $scope.chatLog = data.messages;
	        $scope.$apply();
	    }
    });
	socket.on('set msg',function(data){
        data=JSON.parse(data);
        var usera = data.to_user;
        var userb = data.from_id;
        if (usera == $scope.loggedUser || userb == $scope.loggedUser) {
	        $scope.chatLog = data.chat.messages;
			$scope.$apply();
        }
        
    });

	
	//socket.on('greeting', function(greeting) {
	  //  console.log(greeting);
	//});
}]);

app.factory('posts', ['$http', 'auth', function($http, auth){
	  var o = {
	  		posts : []
	  };
	  o.getAll = function() {
	    return $http.get('/posts').success(function(data){
	      angular.copy(data, o.posts);
	    });
	  };
	  o.create = function(post) {
		  return $http.post('/posts', post, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
		    o.posts.push(data);
		  });
		};
		o.upvote = function(post) {
		  return $http.put('/posts/' + post._id + '/upvote', null, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  })
		    .success(function(data){
		      post.upvotes += 1;
		    });
		};
		o.get = function(id) {
		  return $http.get('/posts/' + id).then(function(res){
		    return res.data;
		  });
		};
		o.addComment = function(id, comment) {
		  return $http.post('/posts/' + id + '/comments', comment, {
		    headers: {Authorization: 'Bearer '+auth.getToken()}
		  });
		};
		o.upvoteComment = function(post, comment) {
		  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  })
		    .success(function(data){
		      comment.upvotes += 1;
		    });
		};
  return o;
}]);
//authorize service
app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

   auth.saveToken = function (token){
	  $window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
	  return $window.localStorage['flapper-news-token'];
	}

	auth.isLoggedIn = function(){
	  var token = auth.getToken();

	  if(token){
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.exp > Date.now() / 1000;
	  } else {
	    return false;
	  }
	};

	auth.currentUser = function(){
	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.username;
	  }
	};

	auth.register = function(user){
	  return $http.post('/register', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	auth.logIn = function(user){
	  return $http.post('/login', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};
	auth.logOut = function(){
	  $window.localStorage.removeItem('flapper-news-token');
	  window.location.href = '/';
	};

  return auth;
}]);
//pre loader animation controller
app.run(function($rootScope){
    $rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
                 $('body').removeClass('loaded');
	  			 $('body').addClass('loading');
        });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
                setTimeout(function(){ $('body').removeClass('loading'); $('body').addClass('loaded') },400);
	  			
	  			setTimeout(function(){ $('body').removeClass('loaded') },500);

        });

});

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	  }],
	  resolve: {
	    postPromise: ['posts', function(posts){
	      return posts.getAll();
	    }]
  	   }
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
      	return posts.get($stateParams.id);
    }]
  }

	})
	.state('login', {
	  url: '/login',
	  templateUrl: '/login.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})
	.state('register', {
	  url: '/register',
	  templateUrl: '/register.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})
	.state('register-profile', {
	  url: '/register-profile',
	  templateUrl: '/register-profile.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      //$state.go('home');
	    }
	  }]
	})
	.state('location', {
	  url: '/location',
	  templateUrl: '/location.html',
	  controller: 'LocationCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	  }]
	})
	.state('roya', {
	  url: '/roya',
	  templateUrl: '/roya.html',
	  controller: 'RoyaCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	  }]
	})
	.state('weather', {
	  url: '/weather',
	  templateUrl: '/weather.html',
	  controller: 'RoyaCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	  }]
	})
	.state('support', {
	  url: '/support',
	  templateUrl: '/support.html',
	  controller: 'SupportCtrl',
	  onEnter: ['$state', 'auth', 'socket', function($state, auth, socket){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	    var currentUser = auth.currentUser();
	    var data_server = {
		    from_id : currentUser
	    }
	    //console.log(data_server);
	    socket.emit('load msg',data_server);
	  }]
	});

  $urlRouterProvider.otherwise('home');
}]);

