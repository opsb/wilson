var wilson = (function(){
	var adaptor = {defer: jQuery.Deferred,
		whenAll: function(promises, callback){
			jQuery.when.apply(null, promises).done(function(){
				callback.apply(null, arguments);
			})
		},
		makePromise: function(deferred){
			return deferred.promise();
		}
	};

	var registered = {};

	function define(name, dependencies, definition){
		var args = _resolveAll(dependencies);
		args.push(function(exportedModule){ _define(name, exportedModule||{}) });
		adaptor.whenAll(args, definition);
	}

	function require(dependencies, callback){
		var args = _resolveAll(dependencies);
		adaptor.whenAll(args, callback);
	}

	function _resolveAll(dependencies){
		var resolved = [];

		for(var i=0; i<dependencies.length;i++){
			var dependency = dependencies[i];
			resolved.push(_resolve(dependency));
		}

		return resolved;
	}

	function _resolve(dependency){
		_addPromisedDependency(dependency);
		return adaptor.makePromise(registered[dependency]);
	}

	function _define(name, definition){
		_addPromisedDependency(name);
		registered[name].resolve(definition);
	}

	function _addPromisedDependency(name){
		if(registered[name]) return;
		registered[name] = adaptor.defer();
		return;
	}

	function _apply(f) {
        return function(array) {

            if(toString.call(array) != '[object Array]') {
                throw new Error('apply called with non-array arg');
            }

            return f.apply(null, array);
        };
    };

	return {
		define: define,
		require: require
	}
})();

if ( typeof window === "object" && typeof window.document === "object" ) {
	window.wilson = wilson;
}
