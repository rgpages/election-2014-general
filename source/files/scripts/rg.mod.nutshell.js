RG.register(function() {
	
	'use strict';
	
	var $anim = { opacity: 'toggle', height: 'toggle' };
	
	$('.nutshell').nutshell({
		classSingle: 'nutshell-single',
		animIn: $anim,
		animOut: $anim
	});
	
}); // RG
