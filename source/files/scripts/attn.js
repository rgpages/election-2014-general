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
			var $div1;
			var $div2;
			
			$.each($data, function(k1, v1) {
				
				$.each(v1, function(k2, v2) {
					
					switch (k2) {
						
						case 'races':
							
							// Encapsulate:
							(function() {
								
								var template;
								
								$div1 = $('<div />');
								
								$.each(v2, function(k3, v3) {
									
									var id1 = 'con-' + v3.contest_id;
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span class="attn-head">' + v3.contest_wrapper + '</span>',
										'</a>'
									].join('\n');
									
									$div1.append(template);
									
									$.each(v3.race.slice(0, 2), function(k4, v4) {
										
										var id2 = 'con-' + v3.contest_id + '_cand-meas-' + v4.cand_meas_id;
										var percent = Math.round(v4.percent_of_state_votes) + '%';
										var src = v4.image_url;
										var name = v4.name;
										
										template = [
											'<span id="' + id2 + '" class="attn-row">',
												'<span class="attn-col">',
													'<img class="attn-circle" src="' + src + '" width="50" title="' + name + '">',
												'</span>',
												'<span class="attn-col">' + percent + '</span>',
											'</span>'
										].join('\n');
										
										$div1
											.find('#' + id1)
											.append(template);
										
									});
									
								});
								
							})();
							
							break;
						
						case 'measures':
							
							// Encapsulate:
							(function() {
								
								var template;
								
								$div2 = $('<div />');
								
								$.each(v2, function(k3, v3) {
									
									var id1 = 'con-' + v3.contest_id;
									
									template = [
										'<a id="' + id1 + '" href="http://vote.registerguard.com/#' + id1 + '">',
											'<span class="attn-head">' + v3.short_description + '</span>',
											'<span class="attn-row attn-label">',
												'<span class="attn-col attn-name">' + v3.contest_name + '</span>',
											'</span>',
										'</a>'
									].join('\n');
									
									$div2.append(template);
									
									$.each(v3.measure, function(k4, v4) {
										
										var id2 = 'con-' + v3.contest_id + '_cand-meas-' + v4.cand_meas_id;
										var percent = Math.round(v4.percent_of_state_votes) + '%';
										var name = v4.name.charAt(0).toLowerCase();
										
										template = [
											'<span id="' + id2 + '" class="attn-row">',
												'<span class="attn-col">',
													'<span class="attn-circle attn-' + name + '">' + name + '</span>',
												'</span>',
												'<span class="attn-col">' + percent + '</span>',
											'</span>'
										].join('\n');
										
										$div2
											.find('#' + id1)
											.append(template);
										
									});
									
								});
								
							})();
							
							break;
						
					}
					
				});
				
			});
			
			$this.html($div1.add($div2));
			
		}
	});
	
});
