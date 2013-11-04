# Wilson

    All things come to him who waits - provided he knows what he is waiting for.
    Woodrow T. Wilson

Wilson is a promise based javascript module loader built on when.js.

## Usage

wilson.register('config', [], function(define){
	define({
		message: "hello"
	});
});

wilson.register('config2', [], function(define){
	define({
		message: "world"
	});
});

wilson.register('domReady', [], function(domReady){
	$(document).ready(domReady());
});

wilson.require(['config', 'config2'], function(config, config2, domReady){
	$('greeting').html(config.message + config2.message);
});
