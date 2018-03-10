var eu_localizations = {
	t:'Tato webová stránka sbírá za účelem zefektivnění poskytovaných služeb provozní data tzv. cookie soubory. Pokud se sběrem cookie souborů nesouhlasíte, změňte nastavení webového prohlížeče.',
	a:'Souhlasím',
	m:'Vice informací',
	l:'http://www.google.com/intl/cs/policies/privacy/partners/'
};

(function(eu_localizations, w, d){
	var includes = {"css":".eu-cookies{display:flex;flex-wrap:nowrap;justify-content:center;background:Menu;align-items:center;color:GrayText;padding:5px;z-index:1000;position:relative}.eu-cookies,.eu-cookies span,.eu-cookies a{font-size:12px;font-family:'Arial','Helvetica',sans-serif}.eu-cookies span{padding-right:5px}.eu-cookies a,.eu-cookies a:hover,.eu-cookies a:visited,.eu-cookies a:active,.eu-cookies a:focus{color:GrayText;text-decoration:underline}.eu-cookies button{flex-shrink:0;cursor:pointer;font-weight:.9em}"};

	function init() {
		if(d.cookie.indexOf('eu-cookies') !== -1) {
			return;
		}

		if(navigator.CookiesOK) {
			addCookie( 'auto-CookiesOK' );
			return;
		}

		if( !w.addEventListener ) {
			//To keep things simple are old browsers unsupported
			return;
		}

		if ( d.readyState === 'complete' ) {
			setTimeout( dry );
		} else {
			d.addEventListener( 'DOMContentLoaded', completed, false );
			w.addEventListener( 'load', completed, false );
		}
	};

	function completed() {
		d.removeEventListener( 'DOMContentLoaded', completed, false );
		w.removeEventListener( 'load', completed, false );
		dry();
	}

	function dry(){
		var html = '<span>%t <a href="%l">%m</a></span> '+
		'<button>%a</button>';
		html = html
			.replace('%t', eu_localizations.t)
			.replace('%l', eu_localizations.l)
			.replace('%m', eu_localizations.m)
			.replace('%a', eu_localizations.a);
		var body = d.body;
		var head = d.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(d.createTextNode(includes.css));

		var div = d.createElement('div');
		div.className = 'eu-cookies priority';
		div.innerHTML = html;
		head.appendChild(style);
		body.insertBefore(div, body.firstChild);
		div.getElementsByTagName('button')[0].addEventListener('click', function(){ consent( div ); });
	}

	function consent( div ) {
		d.body.removeChild( div );
		addCookie();
	}

	function addCookie( reason ) {
		if (typeof reason === 'undefined') {
			reason = '1';
		}
		var date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		var expires = '; expires=' + date.toGMTString();
		d.cookie = 'eu-cookies=' + encodeURIComponent(reason) + expires + '; path=/';
	}

	init();
})(eu_localizations, window, window.document);