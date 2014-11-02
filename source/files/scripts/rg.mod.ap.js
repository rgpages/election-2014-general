//global moment
/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	$.pollster({
		target: 'ap-stories',
		api: 'http://projects.registerguard.com/ballot/json/ap_elex_stories/5/',
		seconds: 1200, // 20 mins.
		callback: function($data, $options) {
			
			var $this = $(this);
			var template = [];
			
			$.each($data, function(key, val) {
				
				template.push([
					'<article class="story">',
						//'<time>' + moment(val.updated).twitterShort() + '</time>',
						'<h6>' + val.dateline_city + '</h6>',
						'<h4><a href="' + val.story_url + '" target="_blank">' + val.headline + '</a></h4>',
					'</article>'
				].join('\n'));
				
			});
			
			$this
				.removeClass('loading')
				.html(template);
			
		}
	});
	
}); // RG
