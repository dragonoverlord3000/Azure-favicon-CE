// Change favicon function (to ico)
function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
     document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

// Change favicon function SVG
function changeFavicon2SVG(src) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = "data:image/svg+xml," + src;
	link.class = "dynamic favicon";
    link.removeAttribute("type");
    document.getElementsByTagName('head')[0].appendChild(link);
};

// convertSVG from "https://chrome.google.com/webstore/detail/amazing-icon-downloader/kllljifcjfleikiipbkdcgllbllahaob"
function convertSVG(iconSVG, defs) {
	// lookup table to get static colors for classes
	let translate = [
		{className: 'msportalfx-svg-c01', fillValue: '#ffffff'},
		{className: 'msportalfx-svg-c02', fillValue: '#e5e5e5'},
		{className: 'msportalfx-svg-c03', fillValue: '#a0a1a2'},
		{className: 'msportalfx-svg-c04', fillValue: '#7a7a7a'},
		{className: 'msportalfx-svg-c05', fillValue: '#3e3e3e'},
		{className: 'msportalfx-svg-c06', fillValue: '#1e1e1e'},
		{className: 'msportalfx-svg-c07', fillValue: '#0f0f0f'},
		{className: 'msportalfx-svg-c08', fillValue: '#ba141a'},
		{className: 'msportalfx-svg-c09', fillValue: '#dd5900'},
		{className: 'msportalfx-svg-c10', fillValue: '#ff8c00'},
		{className: 'msportalfx-svg-c11', fillValue: '#fcd116'},
		{className: 'msportalfx-svg-c12', fillValue: '#fee087'},
		{className: 'msportalfx-svg-c13', fillValue: '#b8d432'},
		{className: 'msportalfx-svg-c14', fillValue: '#57a300'},
		{className: 'msportalfx-svg-c15', fillValue: '#59b4d9'},
		{className: 'msportalfx-svg-c16', fillValue: '#3999c6'},
		{className: 'msportalfx-svg-c17', fillValue: '#804998'},
		{className: 'msportalfx-svg-c18', fillValue: '#ec008c'},
		{className: 'msportalfx-svg-c19', fillValue: '#0072c6'},
		{className: 'msportalfx-svg-c20', fillValue: '#68217a'},
		{className: 'msportalfx-svg-c21', fillValue: '#00188f'},
		{className: 'msportalfx-svg-c22', fillValue: '#a4262c'},
		{className: 'msportalfx-svg-c23', fillValue: '#cae3f3'},
		{className: 'msportalfx-svg-c24', fillValue: '#59aed3'},
		{className: 'msportalfx-svg-c25', fillValue: '#4c3b12'},
		{className: 'msportalfx-svg-c26', fillValue: '#be9555'},
		{className: 'msportalfx-svg-c27', fillValue: '#4f4d52'},
		{className: 'msportalfx-svg-c28', fillValue: '#ef6f59'},
		{className: 'msportalfx-svg-c29', fillValue: '#f7cb64'},
		{className: 'msportalfx-svg-c30', fillValue: '#fdd8db'},
		{className: 'msportalfx-svg-c31', fillValue: '#f6ffec'},
		{className: 'msportalfx-svg-c32', fillValue: '#57a300'},
		{className: 'msportalfx-svg-c33', fillValue: '#8a2da5'},
		{className: 'msportalfx-svg-c34', fillValue: '#e00b1c'},
		{className: 'msportalfx-svg-c35', fillValue: '#015cda'},
		{className: 'msportalfx-svg-c36', fillValue: '#5db300'},
		{className: 'msportalfx-svg-c97', fillValue: '#ffb900'},
		{className: 'msportalfx-svg-c98', fillValue: '#00a4ef'},
		{className: 'msportalfx-svg-c99', fillValue: '#f25022'}
	];

	// Change from a symbol reference to an SVG element
	iconSVG = iconSVG.replace('<svg><defs><symbol', '<svg');
	iconSVG = iconSVG.replace('</symbol></defs></svg>', '</svg>');
	iconSVG = iconSVG.replace('<title></title><defs></defs>', '');

	// Setting the XML NameSpace directly enables the SVG graphic to be viewed instead of the XML tree
	iconSVG = iconSVG.replace('xmlns:svg', 'xmlns');
	
	// Reservations icon has a bug where they specify the same class twice :-/
	iconSVG = iconSVG.replace(new RegExp('msportalfx-svg-c01 msportalfx-svg-c01', 'gi'), 'msportalfx-svg-c01');
	iconSVG = iconSVG.replace(new RegExp('msportalfx-svg-c04 msportalfx-svg-c04', 'gi'), 'msportalfx-svg-c04');

	// Add fill colors for all fill style classes
	for(let i=0; i<translate.length; i++){
		iconSVG = iconSVG.replace(
			new RegExp(` class="${translate[i].className}"`, 'gi'), 
			` class="${translate[i].className}" fill="${translate[i].fillValue}"`
		);
	}
	
	// Include the right gradient definitions based on fill URLs
	
	let gradIDs = [];
	for(let defID in defs) {
		if(defs.hasOwnProperty(defID)) {
			if(iconSVG.indexOf(defID) > -1) {
				gradIDs.push(defID);
			}
		}
	}

	let defCode = '<defs>';
	for(let i=0; i<gradIDs.length; i++){
		defCode += `\n${defs[gradIDs[i]]}`;
	}
	defCode += '\n</defs>\n';
	iconSVG = iconSVG.replace('</g></svg>', `</g>${defCode}</svg>`);

	return iconSVG;
}

// Change favicon to match
async function changeFaviconToSVG() {
	// If homepage, change to standard icon
	if (location.href == "https://portal.azure.com/#home" || location.href == "https://portal.azure.com/#allservices") {
		changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/azure.ico");
	}

	// Get SVG rendering definitions
	let defs = document.getElementById('DefsContainer');
	if(defs && defs.getElementsByTagName) {
		defs = defs.getElementsByTagName('defs');
		if(defs && defs.length) defs = defs[0];
	}

	// Pull out all the gradient definitions
	let returnDefs = {};

	if(defs) {
		let def;
		let defID;

		for(let d=0; d<defs.children.length; d++) {
			def = defs.children[d];
			defID = def.getAttribute('id');
			returnDefs[defID] = (def.outerHTML);
		}
	}

	// Wait for a blade icon to appear
	// document.getElementsByClassName("fxc-gcflink-icon")[0].firstChild.getElementsByTagName("use")[0].href
	let icon_id = await document.getElementsByClassName("fxs-blade-header-icon")[0].firstChild.firstChild.href.baseVal;
	
	// Find the corresponding svg element
	let blade_icon = document.getElementById(icon_id.split("#")[1]).parentNode.parentNode.outerHTML;
	
	// Convert svg to independent format
	let svg_out = convertSVG(blade_icon, returnDefs);
	// Encode the svg for embedding purposes
	svg_out = encodeURIComponent(svg_out);
	// Change favicon
	changeFavicon2(svg_out);
}

// Call the change favicon function
changeFaviconToSVG();


