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

wilson.require(['config', 'config2'], function(config, config2){
	document.getElementById('message').innerHTML = config.message + config2.message;
});
