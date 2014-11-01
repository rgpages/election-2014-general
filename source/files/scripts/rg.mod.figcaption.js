RG.register(function() {
	
	'use strict';
	
	$('figure').each(function() {
		
		var $this = $(this);
		var $img = $this.find('img');
		
		$this
			.css('max-width', $img.width())
			.find('figcaption')
			.fadeIn();
		
	});
	
}); // RG
