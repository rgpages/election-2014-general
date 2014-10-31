(function() {
	
	var $attn = $('#attn').iFrameResize({
		resizedCallback: function(iframe, height, width, type) {
			
			console.log(this, iframe, height, width, type);
			
			$attn.fadeIn();
			
		}
	});
	
})();

(function() {
	
	$.pollster.defaults.api = 'http://registerguard.com/csp/cms/sites/rg/feeds/json.csp',
	$.pollster.defaults.seconds = 300; // 5 mins.
	
	$.each($('.stories'), function(n, y) {
		
		$t = $(this);
		
		$.pollster({
			target: $t.attr('id'),
			params: 'subcats=' + encodeURIComponent($t.data('cats')),
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
	
})();


(function() {
	
	var $timeout;
	
	// http://stackoverflow.com/a/5533262/922323
	var len = function(obj) {
		
		var l = 0;
		
		$.each(obj, function(i, elem) {
			
			l++;
			
		});
		
		return l;
		
	};
	
	$.pollster({
		target: 'parallax',
		api: 'http://sandbox.registerguard.com/electionssp/',
		seconds: 300, // 5 mins.
		callback: function($data, $options) {
			
			// http://www.programming-free.com/2013/12/change-background-image-jquery.html
			var $this = $(this);
			var $images = [];
			var i = 0;
			
			// http://stackoverflow.com/a/3969579/922323
			window.clearTimeout($timeout);
			$timeout = 0;
			
			$.each($data, function(i, v) {
				
				$images.push({
					url: v.url,
					caption: v.caption,
					credit: v.credit,
					org: v.org
				});
				
			});
			
			//console.log($images);
			
			// Combine/merge previous image list with current:
			//var $images = $.extend(true, {}, $this.data('parallax'), $images);
			
			// Store image list for use in next call:
			//$this.data('parallax', $images);
			
			// Basic slideshow:
			(function timer() {
				
				// Load the image first:
				$('<img src="' + $images[i].url + '">')
					.imagesLoaded(function() {
						
						// Hide the current image:
						$this.fadeOut(1000, function() {
							
							// Caption?
							var template = ($images[i].caption) ? [
								'<span>',
									'<span>',
										$images[i].caption,
									'</span>',
									(($images[i].credit) && ('<br><span>' + $images[i].credit) + (($images[i].credit) && ('<br>' + $images[i].org)) + '</span>'),
								'</span>'
							].join('\n') : '';
							
							// Link?
							if ($images[i].link) {
								
								// Yup, then hot it up:
								$this.attr('href', $images[i].link);
								
							} else {
								
								// Nope, so might as well remove it:
								$this.removeAttr('href');
								
							}
							
							// Update caption and show new image:
							$this
								.html(template)
								.css('background-image', 'url(' + $images[i].url +')')
								.fadeIn(1000);
							
							i++
							
							// Start from beginning?
							if (i == len($images)) {
								
								i = 0; // Yes.
								
							}
							
							// Rinse, wash and repeat:
							$timeout = window.setTimeout(timer, 30000);
							
						});
						
					});
				
			}());
			
		}
	});
	
})();

(function() {
	
	$('figure').each(function(index) {
		
		var $this = $(this);
		var $img = $this.find('img');
		
		$this
			.css('max-width', $img.width())
			.find('figcaption')
			.fadeIn();
		
	});
	
})();

(function(window) {
	
	var $window = $(window)
	
	$window.scroll(function($e) {
		
		parallax();
		
	});
	
	function parallax() {
		
		var scrolled = $window.scrollTop();
		
		$('#parallax').css('background-position', '50% ' + ((scrolled * .5) + 'px'));
		
	}

})(window);

(function() {
	
	$.pollster.defaults.loader = 'poll-spinner';
	$.pollster.defaults.seconds = 600; // 10 mins.
	
	$.pollster({
		target: 'results-state-races',
		api: 'http://projects.registerguard.com/ballot/json/stater/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								v1.contest_wrapper,
								(v1.contest_name) ? v1.contest_name : '',
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var id3 = id2 + '_state';
					var percent = v2.percent_of_lane_votes + '%';
					var percent_state = v2.percent_of_state_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-tertiary">',
										'<span class="poll-bar-count">Lane:</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.state_votes + '</span>',
									'</div>',
									'<div class="poll-grid-tertiary">',
										'<span class="poll-bar-count">State:</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id3 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
					$('#' + id3)
						.width(percent_state)
						.children('span')
						.text(percent_state);
					
				});
				
			});
			
		}
	});
	
	$.pollster({
		target: 'results-state-measures',
		api: 'http://projects.registerguard.com/ballot/json/statem/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								(v1.contest_wrapper && v1.contest_wrapper),
								(v1.contest_name && v1.contest_name),
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var id3 = id2 + '_state';
					var percent = v2.percent_of_lane_votes + '%';
					var percent_state = v2.percent_of_state_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-tertiary">',
										'<span class="poll-bar-count">Lane:</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.state_votes + '</span>',
									'</div>',
									'<div class="poll-grid-tertiary">',
										'<span class="poll-bar-count">State:</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id3 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
					$('#' + id3)
						.width(percent_state)
						.children('span')
						.text(percent_state);
					
				});
				
			});
			
		}
	});
	
	$.pollster({
		target: 'results-lane-county',
		api: 'http://projects.registerguard.com/ballot/json/laneco/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								v1.contest_wrapper,
								(v1.contest_name) ? v1.contest_name : '',
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var percent = v2.percent_of_lane_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
				});
				
			});
			
		}
	});
	
	$.pollster({
		target: 'results-eugspr',
		api: 'http://projects.registerguard.com/ballot/json/eugspr/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								v1.contest_wrapper,
								(v1.contest_name) ? v1.contest_name : '',
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var percent = v2.percent_of_lane_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
				});
				
			});
			
		}
	});
	
	$.pollster({
		target: 'results-regional-races',
		api: 'http://projects.registerguard.com/ballot/json/region/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								v1.contest_wrapper,
								(v1.contest_name) ? v1.contest_name : '',
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var percent = v2.percent_of_lane_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
				});
				
			});
			
		}
	});
	
	$.pollster({
		target: 'results-lane-county-measures',
		api: 'http://projects.registerguard.com/ballot/json/laneme/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.first) {
					
					template = [
						'<div id="' + id1 + '" class="poll">',
							'<div class="poll-spinner"></div>',
							'<h6 class="poll-head">',
								v1.contest_wrapper,
								(v1.contest_name) ? v1.contest_name : '',
							'</h6>',
							'<div class="poll-content">',
							'</div>',
						'</div>'
					].join('\n');
					
					$this.append(template);
					
				}
				
				$.each(v1.options, function(i2, v2) {
					
					var id2 = 'con-' + v1.contest_id + '_cand-meas-' + v2.cand_meas_id;
					var percent = v2.percent_of_lane_votes + '%';
					
					if ( ! $options.first) {
						
						template = [
							'<div class="poll-bar">',
								'<span class="poll-bar-title">' + v2.name + '</span>',
								'<div class="poll-grid">',
									'<div class="poll-grid-secondary">',
										'<span class="poll-bar-count">' + v2.lane_votes + '</span>',
									'</div>',
									'<div class="poll-grid-primary">',
										'<div class="poll-bar-wrap">',
											'<div id="' + id2 + '" class="poll-bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1)
							.find('.poll-content')
							.append(template)
							.end()
							.fadeIn();
						
					}
					
					$('#' + id2)
						.width(percent)
						.children('span')
						.text(percent);
					
				});
				
			});
			
		}
	});
	
})();
