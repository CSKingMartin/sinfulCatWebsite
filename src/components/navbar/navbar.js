// navbar.js

var Handlebars = require('handlebars')

Handlebars.registerHelper('listNavbar', function(items, options) {

	for(var i=0, l=items.length; i<l; i++) {
		out = out + "<li>" + options.fn(items[i]) + "</li>";
	}

	return out;

});