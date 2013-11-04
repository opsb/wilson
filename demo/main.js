wilson.register('config', [], function(define){		
	define({
		message: "rar"
	});
});

wilson.register('config2', [], function(define){		
	setTimeout(function(){
		define({
			message: "from me"
		});			
	}, 1000);
});	

wilson.require(['config', 'config2'], function(config, config2){
	console.log(config.message + config2.message);
});
