/* global moment */
/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	$.pollster.defaults.api = 'http://registerguard.com/csp/cms/sites/rg/feeds/json.csp';
	$.pollster.defaults.seconds = 300; // 5 mins.
	
	$.each($('.stories'), function(n, y) {
		
		var $that = $(this);
		
		$.pollster({
			target: $that.attr('id'),
			params: 'subcats=' + encodeURIComponent($that.data('cats')),
			callback: function($data, $options) {
				
				var $this = $(this);
				var template = [];
				
				$.each($data.stories, function(i, v) {
					
					template.push([
						'<div class="story">',
							'<time>' + moment(v.published).twitterShort() + '</time>',
							'<h4><a href="' + v.server + v.path + '" target="_blank">' + v.headline + '</a></h4>',
							(v.deck) && ('<h5 class="sh5">' + v.deck + '</h5>'),
						'</div>'
					].join('\n'));
					
				});
				
				$this
					.removeClass('loading')
					.html(template);
				
			}
		});
		
	});
	
}); // RG
