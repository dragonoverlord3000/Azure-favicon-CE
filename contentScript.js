// Function for changing favicon
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

function changeFavicon2(src) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = "data:image/svg+xml," + src;
    // link.removeAttribute("type");
    document.getElementsByTagName('head')[0].appendChild(link);
};

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

let symbols = document.getElementById('FxSymbolContainer');
let title_id = document.getElementsByClassName("fxs-blade-header-icon")[0].firstChild.firstChild.href.baseVal;;
let blade_icon = document.getElementById(title_id.split("#")[1]).parentNode.parentNode.outerHTML;

svg_out = convertSVG(blade_icon, returnDefs);

changeFavicon2(svg_out)


















// //// Structure for iconmappers: {"Parameter to search for in subtitle": "favicon url"}

// // Maps to icon from subtitletext
// iconMapperSubtitleText = {
//     "Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
//     "App Service": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
//     "Static Web App": "https://azure-favicons-bucket.s3.amazonaws.com/Static+Web+Apps.ico",
//     "Logic App": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Workflow": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Logic App (Standard)": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Logic app": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Key vault": "https://azure-favicons-bucket.s3.amazonaws.com/Key+vault.ico",
//     "Resource group": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+groups.ico",
//     "Subscription": "https://azure-favicons-bucket.s3.amazonaws.com/Subscriptions.ico",
//     "Storage account": "https://azure-favicons-bucket.s3.amazonaws.com/Storage+account.ico",
//     "Virtual machine": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
//     "Scale set instance": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
//     "Virtual machine scale set": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
//     "Billing account": "https://azure-favicons-bucket.s3.amazonaws.com/Cost+Management.ico",
//     "Cost Management + Billing | Billing account": "https://azure-favicons-bucket.s3.amazonaws.com/cost-management.ico",
//     "Deployment": "https://azure-favicons-bucket.s3.amazonaws.com/Deployment.ico",
//     "Management group": "https://azure-favicons-bucket.s3.amazonaws.com/Management+groups.ico",
//     "Container instances": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
//     "Batch account": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
//     "Service Fabric cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Fabric+clusters.ico",     // Untested
//     "Cloud service (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
//     "Kubernetes service": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
//     "Availability set": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
//     "Disk": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
//     "Proximity placement group": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
//     "Host group": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
//     "Host": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico", // Untested
//     "Azure Spring Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Spring+Apps.ico",
//     "Application group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico", // Untested
//     "Maintenance Configuration": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
//     "Workspace": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
//     "Container App": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
//     "Virtual network": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
//     "Front Door and CDN profiles": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
//     "Network interface": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
//     "Route table": "https://azure-favicons-bucket.s3.amazonaws.com/Route+tables.ico",
//     "Service endpoint policy": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
//     "Private endpoint": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico", // Untested
//     "Private link service": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico", // Untested
//     "DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "NAT gateway": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
//     "Firewall Policy": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
//     "Local network gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Local+network+gateways.ico",
//     "Network security group (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
//     "Network security group": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
//     "Synapse private link hub": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
//     "Network Watcher": "https://azure-favicons-bucket.s3.amazonaws.com/Network+Watcher.ico",
//     "Public IP address": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
//     "Application security group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
//     "Private DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "Virtual WAN": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
//     "Traffic Manager profile": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
//     "IP Group": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
//     "Firewall": "https://azure-favicons-bucket.s3.amazonaws.com/Firewalls.ico", // Untested
//     "Service Bus Namespace": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Bus.ico",
//     "Virtual network gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+network+gateways.ico",
//     "Load balancer": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancers.ico", 
//     "Public IP Prefix": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+Prefixes.ico",
//     "DDoS protection plan": "https://azure-favicons-bucket.s3.amazonaws.com/DDoS+protection+plans.ico",
//     "Front Door WAF policy": "https://azure-favicons-bucket.s3.amazonaws.com/Web+Application+Firewall+policies+(WAF).ico",
//     "Bastion": "https://azure-favicons-bucket.s3.amazonaws.com/Bastions.ico",
//     "Application gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Application+gateways.ico",
//     "Route Server": "https://azure-favicons-bucket.s3.amazonaws.com/Route+Servers.ico", // Untested
//     "Reserved IP address (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
//     "Azure Cosmos DB account": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
//     "Azure Active Directory": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Active+Directory.ico",
//     "Azure Cosmos DB for MongoDB account": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
// };

// // Most of the parameters are the same as the "iconMapperSubtitleText", but with an added 's'
// // Maps to icon from title text
// iconMapperTitleText = {
//     "Static Web Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Static+Web+Apps.ico",
//     "Resource groups": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+groups.ico",
//     "Virtual machines": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
//     "Recent": "https://azure-favicons-bucket.s3.amazonaws.com/Recent.ico",
//     "Management groups": "https://azure-favicons-bucket.s3.amazonaws.com/Management+groups.ico",
//     "Subscriptions": "https://azure-favicons-bucket.s3.amazonaws.com/Subscriptions.ico",
//     "Marketplace": "https://azure-favicons-bucket.s3.amazonaws.com/Marketplace.ico",
//     "Help + support": "https://azure-favicons-bucket.s3.amazonaws.com/Help+%2B+support.ico",
//     "Service Health | Service issues": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Health.ico",
//     "Tags": "https://azure-favicons-bucket.s3.amazonaws.com/Tags.ico",
//     "What's new": "https://azure-favicons-bucket.s3.amazonaws.com/What's+new.ico",
//     "Quickstart Center": "https://azure-favicons-bucket.s3.amazonaws.com/Quickstart+Center.ico",
//     "Shared dashboards": "https://azure-favicons-bucket.s3.amazonaws.com/Shared+dashboards.ico",
//     "Free services": "https://azure-favicons-bucket.s3.amazonaws.com/Free+services.ico",
//     "Resource Explorer": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+Explorer.ico",
//     "Logic apps": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Create Logic App": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Logic Apps Designer": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
//     "Virtual machine scale sets": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
//     "Create a virtual machine scale set": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
//     "Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
//     "Create Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
//     "App Services": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
//     "Create Web App": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
//     "Container instances": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
//     "Create container instance": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
//     "Batch accounts": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
//     "New Batch account": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
//     "Service Fabric clusters": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Fabric+clusters.ico",
//     "All resources": "https://azure-favicons-bucket.s3.amazonaws.com/All+resources.ico",
//     "Cloud services (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
//     "Create a cloud service": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
//     "Kubernetes services": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
//     "Kubernetes Service": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
//     "Create Kubernetes cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
//     "Availability sets": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
//     "Create availability set": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
//     "Disks (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
//     "Create disk": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
//     "OS images (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
//     "VM images (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
//     "Create VM image": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
//     "Citrix Virtual Apps Essentials": "https://azure-favicons-bucket.s3.amazonaws.com/Citrix+Virtual+Desktops+Essentials.ico",
//     "Citrix Virtual Desktops Essentials": "https://azure-favicons-bucket.s3.amazonaws.com/Citrix+Virtual+Desktops+Essentials.ico",
//     "SAP HANA on Azure": "https://azure-favicons-bucket.s3.amazonaws.com/SAP+HANA+on+Azure.ico",
//     "Proximity placement groups": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
//     "Create Proximity Placement Group": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
//     "Host groups": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
//     "Create host group": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
//     "Hosts": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico",
//     "Create dedicated host": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico",
//     "Azure Spring Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Spring+Apps.ico",
//     "Application groups": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico",
//     "Create an application group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico",
//     "Maintenance Configurations": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
//     "Create a maintenance configurations": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
//     "Workspaces": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
//     "Create a workspace": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
//     "Container Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
//     "Create Container App": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
//     "Virtual networks": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
//     "Virtual networks (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
//     "Create virtual network": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
//     "Front Door and CDN profiles": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
//     "Create a Front Door profile": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
//     "Network interfaces": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
//     "Create network interface": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
//     "Route tables": "https://azure-favicons-bucket.s3.amazonaws.com/Route+tables.ico",
//     "Service endpoint policies": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
//     "Create a service endpoint policy": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
//     "Private Link Center": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
//     "Create a private endpoint": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
//     "Create private link service": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
//     "DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "Create DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "NAT gateways": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
//     "Create network address translation (NAT) gateway": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
//     "Firewall Policies": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
//     "Create an Azure Firewall Policy": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
//     "Local network gateways": "https://azure-favicons-bucket.s3.amazonaws.com/Local+network+gateways.ico",
//     "Network security groups (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
//     "Create network security group": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
//     "Load balancing": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancing+-+help+me+choose.ico",
//     "Azure Synapse Analytics (private link hubs)": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
//     "Create Synapse private link hub": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
//     "Network Watcher": "https://azure-favicons-bucket.s3.amazonaws.com/Network+Watcher.ico",
//     "Public IP addresses": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
//     "Application security groups": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
//     "Create an application security group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
//     "Private DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "Create Private DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
//     "Virtual WANs": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
//     "Create WAN": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
//     "Load balancing | Traffic Manager": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
//     "Create Traffic Manager profile": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
//     "IP Groups": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
//     "Create an IP Group": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
//     "Firewalls": "https://azure-favicons-bucket.s3.amazonaws.com/Firewalls.ico",
//     "Service Bus": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Bus.ico",
//     "Virtual network gateways": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+network+gateways.ico",
//     "Load balancing | Load Balancer": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancers.ico",
//     "Public IP Prefixes": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+Prefixes.ico",
//     "DDoS protection plans": "https://azure-favicons-bucket.s3.amazonaws.com/DDoS+protection+plans.ico",
//     "Web Application Firewall policies (WAF)": "https://azure-favicons-bucket.s3.amazonaws.com/Web+Application+Firewall+policies+(WAF).ico",
//     "Bastions": "https://azure-favicons-bucket.s3.amazonaws.com/Bastions.ico",
//     "Load balancing | Application Gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Application+gateways.ico",
//     "Firewall Manager": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Manager.ico",
//     "Connections": "https://azure-favicons-bucket.s3.amazonaws.com/Connections.ico",
//     "Route Servers": "https://azure-favicons-bucket.s3.amazonaws.com/Route+Servers.ico",
//     "Reserved IP addresses (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
//     "Storage accounts": "https://azure-favicons-bucket.s3.amazonaws.com/Storage+account.ico",
//     "Azure Cosmos DB": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
//     "Azure Cosmos DB for MongoDB": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
//     "App registrations": "https://azure-favicons-bucket.s3.amazonaws.com/App+registrations.ico",
// };


// // Get subtitletext of tab
// var subtitleTexts = [].slice.call(document.getElementsByClassName("fxs-blade-title-subtitleText msportalfx-tooltip-overflow fxs-portal-subtext"));
// subtitleTexts.reverse()

// // Get titleText of tab
// var titleTexts = [].slice.call(document.getElementsByClassName("fxs-blade-title-titleText msportalfx-tooltip-overflow"));
// titleTexts.reverse()


// function iconMapperPortal() {
//     // If homepage or allservices page
//     if ((window.location.href).includes("portal.azure.com/#home") || (window.location.href).includes("portal.azure.com/#allservices")) {
//         // Change to default logo
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/home_400x400.ico");
//         return;
//     };

//     // If site has subtitleText - change to match
//     for (const subtitleText of subtitleTexts) {
//         subText = subtitleText.textContent;
//         if (iconMapperSubtitleText.hasOwnProperty(subText)) {
//             const element = iconMapperSubtitleText[subText];
//             changeFavicon(element);
//             return;
//         } 
//     };

//     // If site has TitleText - change to match
//     for (const titleText of titleTexts) {
//         tiText = titleText.textContent;
//         if (iconMapperTitleText.hasOwnProperty(tiText)) {
//             const element = iconMapperTitleText[tiText];
//             changeFavicon(element);
//             return;
//         } 
//     };
// };

// function iconMapperEndpoint() {
//     // Url list
//     var url_list = (window.location.href).split("/");
//     console.log(url_list);

//     ////////////////////////////
//     // All the overview menus //
//     ////////////////////////////

//     // Home
//     if ((window.location.href).includes("endpoint.microsoft.com/#home")) {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Azure+home.ico");
//         return;
//     };

//     // Dashboard
//     if (url_list.length > 4 && url_list[4] == "dashboard") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Dashboard.ico");
//         return;
//     };

//     // All services
//     if (url_list.length > 5 && url_list[3] == "#allservices" && url_list[4] == "category" && url_list[5] == "All") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/All+services.ico");
//         return;
//     };

//     // Devices
//     if (url_list.length > 7 && url_list[5] == "DevicesMenu" && url_list[7].toLowerCase() == "overview") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Devices.ico");
//         return;
//     };

//     // Apps
//     if (url_list.length > 7 && url_list[5] == "AppsMenu" && url_list[7].toLowerCase() == "overview") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Apps.ico");
//         return;
//     };

//     // Endpoint security
//     if (url_list.length > 6 && url_list[5] == "SecurityManagementMenu") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Endpoint+security.ico");
//         return;
//     };

//     // Reports
//     if (url_list.length > 6 && url_list[5] == "ReportingMenu" && url_list[7].toLowerCase() == "overview") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Reports.ico");
//         return;
//     };

//     // Users
//     if (url_list.length > 7 && url_list[5] == "UserManagementMenuBlade" && url_list[7].toLowerCase() == "allusers") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Users.ico");
//         return;
//     };

//     // Groups
//     if (url_list.length > 7 && url_list[5] == "GroupsManagementMenuBlade" && url_list[7].toLowerCase() == "allgroups") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Groups.ico");
//         return;
//     };

//     // Tenant admins
//     if (url_list.length > 7 && url_list[5] == "TenantAdminMenu" && url_list[7].toLowerCase() == "tenantstatus") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Tenant+administration.ico");
//         return;
//     };

//     // Support menu
//     if (url_list.length > 7 && url_list[5] == "SupportMenu" && url_list[7].toLowerCase() == "troubleshooting") {
//         changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/endpointMicrosoft/Troubleshooting+%2B+support.ico");
//         return;
//     };
// };


// if ((window.location.href).includes("portal.azure.com")) {
//     iconMapperPortal();
// } else if ((window.location.href).includes("endpoint.microsoft.com")) {
//     iconMapperEndpoint();
// };

// // Otherwise keep current logo until page refresh or until a new page with known favicon is fetched
