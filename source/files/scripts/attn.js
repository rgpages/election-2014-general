$(function() {
	
	$('#attn').on('click', 'a', function($e) {
		
		var $this = $(this);
		var href;
		
		if ('parentIFrame' in window) {
			
			$e.preventDefault();
			$e.stopPropagation();
			
			$this.blur();
			
			href = $this.attr('href');
			
			//console.log(href.substring(href.indexOf('#') + 1));
			
			window.parentIFrame.sendMessage(href.substring(href.indexOf('#')));
			
		}
		
	});
	
	$.pollster({
		api: 'http://projects.registerguard.com/ballot/json/topset/',
		seconds: 60, // 1 min.
		target: 'attn',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(k1, v1) {
				
				$.each(v1, function(k2, v2) {
					
					var $div;
					
					if ($options.first) {
						
						$div = $('<div />')
							.hide();
						
					}
					
					switch (k2) {
						
						case 'races':
							
							$.each(v2, function(k3, v3) {
								
								var id1 = 'con-' + v3.contest_id;
								
								if ($options.first) {
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span>' + ((v3.contest_wrapper == 'Governor') ? 'Oregon Governor' : 'U.S. Senate') + '</span>', // Can't think of a better way to handle race names.
										'</a>'
									].join('\n');
									
									$div.append(template);
									
								}
								
								$.each(v3.race.slice(0, 2), function(k4, v4) {
									
									var id2 = 'con-' + v3.contest_id + '_cand-meas-' + v4.cand_meas_id;
									var percent = Math.round(v4.percent_of_state_votes) + '%';
									var src = v4.image_url;
									var name = v4.name;
									
									if ($options.first) {
										
										template = [
											'<span id="' + id2 + '">',
												'<span><img src="' + src + '" width="50" title="' + name + '"></span>',
												'<span>' + percent + '</span>',
											'</span>'
										].join('\n');
										
										$div
											.find('#' + id1)
											.append(template);
										
									}
									
								});
								
							});
							
							if ($options.first) {
								
								$div
									.appendTo($this)
									.fadeIn();
								
							} else {
								
								$('#' + id2)
									.children()
									.find('img')
									.attr('src', src)
									.attr('title', name)
									.end()
									.last()
									.text(percent);
								
							}
							
							break;
						
						case 'measures':
							
							$.each(v2, function(k3, v3) {
								
								var id1 = 'con-' + v3.contest_id;
								
								if ($options.first) {
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span>' + v3.contest_name + '</span>',
										'</a>'
									].join('\n');
									
									$div.append(template);
									
								}
								
								$.each(v3.measure, function(k4, v4) {
									
									var id2 = 'con-' + v3.contest_id + '_cand-meas-' + v4.cand_meas_id;
									var percent = Math.round(v4.percent_of_state_votes) + '%';
									var name = v4.name.charAt(0).toLowerCase();
									
									if ($options.first) {
										
										template = [
											'<span id="' + id2 + '">',
												'<span class="attn-' + name + '">' + name + '</span>',
												'<span>' + percent + '</span>',
											'</span>'
										].join('\n');
										
										$div
											.find('#' + id1)
											.append(template);
										
									}
									
								});
								
							});
							
							if ($options.first) {
								
								$div
									.appendTo($this)
									.fadeIn();
								
							} else {
								
								$('#' + id2)
									.children()
									.first()
									.attr('class', '')
									.addClass('attn-' + name)
									.end()
									.last()
									.text(percent);
								
							}
							
							break;
						
					}
					
				});
				
			});
			
		}
	});
	
});
