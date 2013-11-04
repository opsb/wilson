requirejs(['lib/rewriter'], function(rewriter) {
    rewriter.then(function(rewriter){
    	rewriter.rewrite();
    });
});