define("lib/rewriter", ["when", 'lib/config'], function(when, config){

	var deferred = when.defer();

	config.then(function(config){
		deferred.resolve({
			rewrite: function(){
				console.log(config.message());
			}
		});
	});

	return deferred.promise;
});
