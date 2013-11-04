requirejs(['when', 'apply'], function(when, apply) {
	var config = (function(){
		var deferred = when.defer();

		deferred.resolve({
			message: function(){
				return "yarr";
			}
		});

		return deferred.promise;	
	})();

	var rewriter = (function(){
		var deferred = when.defer();

		when.all([config], apply(function(config){
			deferred.resolve({
				rewrite: function(){
					console.log(config.message());
				}
			});
		}))

		return deferred.promise;
	})();


	rewriter.then(function(rewriter){
		rewriter.rewrite();
	});

});

