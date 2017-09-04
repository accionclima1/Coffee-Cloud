//Variety controller
app.controller('ChemCtrl', [
	'$scope',
	'auth',
	'$location',
	'chemicals',
    '$window',
    'user',
	function ($scope, auth, $location, chemicals, $window, user) {
	    var currentchemicals = [];
	    $scope.isprocessing = false;

	    var loadAll = function () {
	        chemicals.getAll().then(function (chemicals) {
	            currentchemicals = chemicals.data;
	            console.log(currentchemicals);
	            $scope.chemicals = currentchemicals;

	            for (var vcnt = 0; vcnt < $scope.chemicals.length; vcnt++) {
	                $scope.chemicals[vcnt].original = angular.copy($scope.chemicals[vcnt].name);
	                $scope.chemicals[vcnt].isEditing = false;
	            }

	        });
	    };

	    loadAll();

	    $scope.addNew = function () {
	        if ($scope.newVariety) {
	            newChemical = {}
	            newChemical["name"] = $scope.newChemical;

	            chemicals.create(newChemical).then(function (newVar) {
	                currentchemicals.push(newVar.data);
	                $scope.chemicals = currentchemicals;
	                $scope.newChemical = "";
	            });
	        }
	    };


	    $scope.deleteChemical = function (varId, index) {

	        varIdObj = {}
	        varIdObj["varId"] = varId;

	        varieties.deleteVariety(varIdObj).then(function (newVar) {
	            currentchemicals.splice(index, 1);
	            $scope.chemicals = currentchemicals;
	        });
	    };

	    $scope.updateChemical = function (chemical) {
	        $scope.isprocessing = true;
	        chemicals.update(chemical).then(function (response) {
	            if (response.data.Success) {
	                chemical.original = angular.copy(chemical.name);
	            } else {
	                chemical.name = angular.copy(chemical.original);
	            }
	            chemical.isEditing = false;
	            $scope.isprocessing = false;
	        });


	    }

	}]);



app.factory('chemicals', ['$http', 'auth', '$window', function ($http, auth, $window) {
    var o = {};
    o.getAll = function (id) {
        return $http.get('/chemicals').success(function (data) {
            return data;
        });
    };
    o.create = function (chemicals) {
        //localhost unit
        return $http.post('/chemicals', varieties, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        }).success(function (data) {
            return data;
        });
    };

    o.update = function (chemicals) {
        return $http.post('/chemicals/update', varieties, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        }).success(function (data) {
            return data;
        });
    }

    o.deleteVariety = function (Ided) {
        console.log(Ided);
        return $http.delete('/chemicals', {
            headers: { Authorization: 'Bearer ' + auth.getToken(), variid: Ided.varId }
        }).success(function (data) {
            return Ided;
        });
    };
    return o;
}]);
