(function(){
	
	$('figure').each(function(index) {
		
		var $this = $(this);
		var $img = $this.find('img');
		
		$this
			.css('max-width', $img.width())
			.find('figcaption')
			.fadeIn();
		
	});
	
})();

(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
      
      el.style.backgroundPosition = elBackgrounPos;

    });
  };

})();

(function(){
	
	$.pollster.defaults.loader = 'poll-spinner';
	$.pollster.defaults.timeout = 600;
	
	$.pollster({
		target: 'results-state-races',
		api: 'http://projects.registerguard.com/ballot/json/stater/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
				
				if ( ! $options.flag) {
					
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
					
					if ( ! $options.flag) {
						
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
