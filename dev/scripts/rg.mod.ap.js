/* global moment */
/* jshint unused:vars */

RG.register(function() {
	
	'use strict';
	
	$.pollster({
		target: 'ap-stories',
		api: 'http://projects.registerguard.com/ballot/json/ap_elex_stories/10/',
		seconds: 600, // 10 mins.
		callback: function($data, $options) {
			
			var $this = $(this);
			var template = [];
			
			$.each($data, function(key, val) {
				
				template.push([
					'<article class="story">',
						'<time>' + moment(val.updated).twitterShort() + '</time>',
						'<h6>' + val.dateline_city + '</h6>',
						(val.first_image_thumb_url && '<a href="' + val.story_url + '"><img src="' + val.first_image_thumb_url + '" width="100"></a>'),
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
