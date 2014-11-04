/* global moment */
/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	$.pollster.defaults.api = 'http://registerguard.com/csp/cms/sites/rg/feeds/json.csp';
	$.pollster.defaults.seconds = 180; // 3 mins.
	
	$.each($('.stories'), function(n, y) {
		
		var $that = $(this);
		
		if ($that.attr('data-subcats')) {
			
			$.pollster({
				target: $that.attr('id'),
				params: 'items=10&subcats=' + encodeURIComponent($that.data('subcats')),
				callback: function($data, $options) {
					
					var $this = $(this);
					var template = [];
					
					$.each($data.stories, function(i, v) {
						
						template.push([
							'<article class="story">',
								'<time>' + moment(v.published).twitterShort() + '</time>',
								'<h6>' + v.category + '</h6>',
								'<h4><a href="' + v.server + v.path + '" target="_blank">' + v.headline + '</a></h4>',
								(v.deck) && ('<h5 class="sh5">' + v.deck + '</h5>'),
							'</article>'
						].join('\n'));
						
					});
					
					$this
						.removeClass('loading')
						.html(template);
					
				}
			});
			
		}
		
	});
	
}); // RG
