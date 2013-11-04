wilson.register('config', [], function(define){		
	define({
		message: "hello"
	});
});

wilson.register('config2', [], function(define){		
	setTimeout(function(){
		define({
			message: "world"
		});			
	}, 1000);
});	

wilson.register('domReady', [], function(ready){
	window.onload = function(){
		ready();
	};
});

wilson.require(['config', 'config2', 'domReady'], function(config, config2){
	document.getElementById('message').innerHTML = config.message + config2.message;
});
