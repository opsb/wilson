var wilson = (function(){
	var adaptors = {
		when: function(when){
			return {
				defer: when.defer,
				whenAll: when.all
			}
		}
	}

	var registered = {};

	var adaptor = adaptors.when(when);

	function define(name, dependencies, definition){
		var args = _resolveAll(dependencies);
		args.push(function(exportedModule){ _define(name, exportedModule||{}) });
		adaptor.whenAll(args, apply(definition));
	}

	function require(dependencies, callback){
		var args = _resolveAll(dependencies);
		adaptor.whenAll(args, apply(callback));
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
		registered[name] = adaptor.defer();
		return;
	}

	return {
		define: define,
		require: require
	}
})();

if ( typeof window === "object" && typeof window.document === "object" ) {
	window.wilson = wilson;
}
