RG.register(function() {
	
	'use strict';
	
	$('#attn').iFrameResize({
		enablePublicMethods: true,
		messageCallback: function ($obj) {
			
			//console.log($obj.message);
			
			$.smoothScroll({
				scrollTarget: $obj.message,
				afterScroll: function($o) {
					
					$($o.scrollTarget)
						.addClass('glow')
						.delay(1000)
						.queue(function() {
							
							$(this)
								.removeClass('glow')
								.dequeue();
							
						});
					
				}
			});
			
		}
	});
	
}); // RG
