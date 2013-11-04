define("lib/config", ['when'], function(when){
	var deferred = when.defer();

	deferred.resolve({
		message: function(){
			return "yarr";
		}
	});

	return deferred.promise;
});	
