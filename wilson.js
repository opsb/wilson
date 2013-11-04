var wilson = (function(){
	var registered = {};

	function register(name, dependencies, definition){
		var args = _resolveAll(dependencies);
		args.push(function(exportedModule){ _define(name, exportedModule||{}) });
		when.all(args, apply(definition));
	}		

	function require(dependencies, callback){
		var args = _resolveAll(dependencies);
		when.all(args, apply(callback));
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
		return registered[dependency].promise;
	}

	function _define(name, definition){
		_addPromisedDependency(name);
		registered[name].resolve(definition);
	}

	function _addPromisedDependency(name){
		if(registered[name]) return;
		registered[name] = when.defer();
		return;
	}

	return {
		register: register,
		require: require
	}
})();