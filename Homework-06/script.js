jQuery(document).ready(function($){
	$(".fa-navicon").on("click", function(){
		$(".mobileMenuItems").slideToggle();
		$(this).toggleClass("active");
	});
});

function slideMin() {
	$( ".toggleMin" ).toggle( "slide", {direction: "right"});
}

function slide() {
	$( ".toggle" ).toggle( "slide" );
}

var TRange=null;

function findString (str) {
	if (parseInt(navigator.appVersion)<4) return;
	var strFound;
	if (window.find) {
		strFound=self.find(str);
		if (!strFound) {
			strFound=self.find(str,0,1);
			while (self.find(str,0,1)) continue;
		}
	}
	if (!strFound) alert ("String '"+str+"' not found!")
	return;
}