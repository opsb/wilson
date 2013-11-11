# Wilson

    All things come to him who waits - provided he knows what he is waiting for.
    Woodrow T. Wilson

Wilson is a promise based asynchronous service locator.

## Usage

	wilson.define('config', [], function(exportModule){		
		exportModule({
			message: "hello"
		});
	});

	wilson.define('config2', [], function(exportModule){		
		setTimeout(function(){
			exportModule({
				message: "world"
			});			
		}, 1000);
	});	

	wilson.define('domReady', [], function(ready){
		window.onload = function(){
			ready();
		};
	});

	wilson.require(['config', 'config2', 'domReady'], function(config, config2){
		document.getElementById('message').innerHTML = config.message + config2.message;
	});

