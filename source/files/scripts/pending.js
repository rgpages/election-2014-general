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
	
	$.pollster.defaults.loader = 'tile-spinner';
	$.pollster.defaults.timeout = 600;
	
	$.pollster({
		target: 'results-lane-county',
		api: 'http://projects.registerguard.com/ballot/json/statew/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.flag) {
					
					template = [
						'<div id="' + id1 + '" class="tile">',
							'<h5 class="tile-head">' + v1.contest_wrapper + '</h5>',
							'<div class="tile-content">',
								'<div class="tile-spinner"></div>',
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
							'<div class="bar">',
								'<span class="bar-label">' + v2.name + ':</span>',
								'<div class="pure-g">',
									'<div class="pure-u-21-24">',
										'<div class="bar-wrap">',
											'<div id="' + id2 + '" class="bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="pure-u-3-24">',
										'<span class="bar-count">' + v2.lane_votes + '</span>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1 + ' .tile-content').append(template);
						
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
		target: 'results-nation',
		api: 'http://projects.registerguard.com/ballot/json/nation/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.flag) {
					
					template = [
						'<div id="' + id1 + '" class="tile">',
							'<h5 class="tile-head">' + v1.contest_wrapper + '</h5>',
							'<div class="tile-content">',
								'<div class="tile-spinner"></div>',
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
							'<div class="bar">',
								'<span class="bar-label">' + v2.name + ':</span>',
								'<div class="pure-g">',
									'<div class="pure-u-21-24">',
										'<div class="bar-wrap">',
											'<div id="' + id2 + '" class="bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="pure-u-3-24">',
										'<span class="bar-count">' + v2.lane_votes + '</span>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1 + ' .tile-content').append(template);
						
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
		target: 'results-oregon',
		api: 'http://projects.registerguard.com/ballot/json/oregon/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.flag) {
					
					template = [
						'<div id="' + id1 + '" class="tile">',
							'<h5 class="tile-head">' + v1.contest_wrapper + '</h5>',
							'<div class="tile-content">',
								'<div class="tile-spinner"></div>',
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
							'<div class="bar">',
								'<span class="bar-label">' + v2.name + ':</span>',
								'<div class="pure-g">',
									'<div class="pure-u-21-24">',
										'<div class="bar-wrap">',
											'<div id="' + id2 + '" class="bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="pure-u-3-24">',
										'<span class="bar-count">' + v2.lane_votes + '</span>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1 + ' .tile-content').append(template);
						
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
						'<div id="' + id1 + '" class="tile">',
							'<h5 class="tile-head">' + v1.contest_wrapper + '</h5>',
							'<div class="tile-content">',
								'<div class="tile-spinner"></div>',
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
							'<div class="bar">',
								'<span class="bar-label">' + v2.name + ':</span>',
								'<div class="pure-g">',
									'<div class="pure-u-21-24">',
										'<div class="bar-wrap">',
											'<div id="' + id2 + '" class="bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="pure-u-3-24">',
										'<span class="bar-count">' + v2.lane_votes + '</span>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1 + ' .tile-content').append(template);
						
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
		target: 'results-region',
		api: 'http://projects.registerguard.com/ballot/json/region/',
		callback: function($data, $options) {
			
			var $this = $(this);
			var template;
			
			$.each($data, function(i1, v1) {
				
				var $contest;
				var id1 = 'con-' + v1.contest_id;
				
				if ( ! $options.flag) {
					
					template = [
						'<div id="' + id1 + '" class="tile">',
							'<h5 class="tile-head">' + v1.contest_wrapper + '</h5>',
							'<div class="tile-content">',
								'<div class="tile-spinner"></div>',
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
							'<div class="bar">',
								'<span class="bar-label">' + v2.name + ':</span>',
								'<div class="pure-g">',
									'<div class="pure-u-21-24">',
										'<div class="bar-wrap">',
											'<div id="' + id2 + '" class="bar-votes">',
												'<span></sapn>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="pure-u-3-24">',
										'<span class="bar-count">' + v2.lane_votes + '</span>',
									'</div>',
								'</div>',
							'</div>'
						].join('\n');
						
						$('#' + id1 + ' .tile-content').append(template);
						
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


