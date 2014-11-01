/* jshint -W008 */

RG.register(function() {
	
	'use strict';
	
	var $window = $(window);
	
	$window.scroll(function() {
		
		parallax();
		
	});
	
	function parallax() {
		
		var scrolled = $window.scrollTop();
		
		$('#parallax').css('background-position', '50% ' + ((scrolled * .5) + 'px'));
		
	}
	
}); // RG
