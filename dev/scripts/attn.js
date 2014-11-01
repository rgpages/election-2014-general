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
		seconds: 300, // 5 mins.
		target: 'attn',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(k1, v1) {
				
				$.each(v1, function(k2, v2) {
					
					switch (k2) {
						
						case 'races':
							
							var $div = $('<div />');
							$div.hide();
							
							$.each(v2, function(k3, v3) {
								
								var id1 = 'con-' + v3.contest_id;
								
								if ( ! $options.first) {
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span>' + ((v3.contest_wrapper == 'Governor') ? 'Gov' : 'Sen') + '</span>', // Can't think of a better way to handle race names.
											'<span class="attn-content"></span>',
										'</a>'
									].join('\n');
									
									$div.append(template);
									
								}
								
								$.each(v3.race.slice(0, 2), function(k4, v4) {
									
									if ( ! $options.first) {
										
										template = [
											'<span><img src="images/img6.png" width="50" title="' + v4.name + '"></span>',
											'<span>' + v4.percent_of_state_votes + '%</span>'
										].join('\n');
										
										$div
											.find('#' + id1 + ' .attn-content')
											.append(template);
										
									}
									
								});
								
							});
							
							if ( ! $options.first) {
								
								$div
									.appendTo($this)
									.fadeIn();
								
							}
							
							break;
						
						case 'measures':
							
							var $div = $('<div />');
							$div.hide();
							
							$.each(v2, function(k3, v3) {
								
								var id1 = 'con-' + v3.contest_id;
								
								if ( ! $options.first) {
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span>' + v3.contest_name + '</span>',
											'<span class="attn-content"></span>',
										'</a>'
									].join('\n');
									
									$div.append(template);
									
								}
								
								$.each(v3.measure, function(k4, v4) {
									
									if ( ! $options.first) {
										
										template = [
											'<span><img src="images/img6.png" width="50" title="' + v4.name + '"></span>',
											'<span>' + v4.percent_of_state_votes + '%</span>'
										].join('\n');
										
										$div
											.find('#' + id1 + ' .attn-content')
											.append(template);
										
									}
									
								});
								
							});
							
							if ( ! $options.first) {
								
								$div
									.appendTo($this)
									.fadeIn();
								
							}
							
							break;
						
					}
					
				});
				
			});
			
		}
	});
	
});
