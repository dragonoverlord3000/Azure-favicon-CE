// console.log(`Current URL = ${window.location.href}`)

/*
    - TODO:
1. Update on url-change, not using alarm API

2. onInstalled query everything
*/


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


//// Structure for iconmappers: {"Parameter to search for in subtitle": "favicon url"}

// Maps to icon from subtitletext
iconMapperSubtitleText = {
    // Web stuff
    "Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
    "App Service": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
    "Static Web App": "https://azure-favicons-bucket.s3.amazonaws.com/Static+Web+Apps.ico",
    // Logic app
    "Logic App": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    "Logic app": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    // Key vault
    "Key vault": "https://azure-favicons-bucket.s3.amazonaws.com/Key+vault.ico",
    // Resource groups - holds multiple resources
    "Resource group": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+groups.ico",
    // Subscriptions
    "Subscription": "https://azure-favicons-bucket.s3.amazonaws.com/Subscriptions.ico",
    // Storage account
    "Storage account": "https://azure-favicons-bucket.s3.amazonaws.com/Storage+account.ico",
    // Virtual machine
    "Virtual machine": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
    "Scale set instance": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
    // Virtual machine scale sets
    "Virtual machine scale set": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
    // Cost management and billing
    "Billing account": "https://azure-favicons-bucket.s3.amazonaws.com/Cost+Management.ico",
    "Cost Management + Billing | Billing account": "https://azure-favicons-bucket.s3.amazonaws.com/cost-management.ico",
    // Deplyoment page
    "Deployment": "https://azure-favicons-bucket.s3.amazonaws.com/Deployment.ico",
    // Management group - holds multiple subscriptions
    "Management group": "https://azure-favicons-bucket.s3.amazonaws.com/Management+groups.ico",
    // "Shared dashboard": "https://azure-favicons-bucket.s3.amazonaws.com/Shared+dashboards.ico",
    // "Private dashboard": "https://azure-favicons-bucket.s3.amazonaws.com/Shared+dashboards.ico",
    "Container instances": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
    "Batch account": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
    "Service Fabric cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Fabric+clusters.ico",     // Untested
    "Cloud service (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
    "Kubernetes service": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
    "Availability set": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
    "Disk": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
    "Proximity placement group": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
    "Host group": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
    "Host": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico", // Untested
    "Azure Spring Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Spring+Apps.ico",
    "Application group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico", // Untested
    "Maintenance Configuration": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
    "Workspace": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
    "Container App": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
    "Virtual network": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
    "Front Door and CDN profiles": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
    "Network interface": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
    "Route table": "https://azure-favicons-bucket.s3.amazonaws.com/Route+tables.ico",
    "Service endpoint policy": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
    "Private endpoint": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico", // Untested
    "Private link service": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico", // Untested
    "DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "NAT gateway": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
    "Firewall Policy": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
    "Local network gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Local+network+gateways.ico",
    "Network security group (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
    "Network security group": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
    "Synapse private link hub": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
    "Network Watcher": "https://azure-favicons-bucket.s3.amazonaws.com/Network+Watcher.ico",
    "Public IP address": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
    "Application security group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
    "Private DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "Virtual WAN": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
    "Traffic Manager profile": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
    "IP Group": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
    "Firewall": "https://azure-favicons-bucket.s3.amazonaws.com/Firewalls.ico", // Untested
    "Service Bus Namespace": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Bus.ico",
    "Virtual network gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+network+gateways.ico",
    "Load balancer": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancers.ico", 
    "Public IP Prefix": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+Prefixes.ico",
    "DDoS protection plan": "https://azure-favicons-bucket.s3.amazonaws.com/DDoS+protection+plans.ico",
    "Front Door WAF policy": "https://azure-favicons-bucket.s3.amazonaws.com/Web+Application+Firewall+policies+(WAF).ico",
    "Bastion": "https://azure-favicons-bucket.s3.amazonaws.com/Bastions.ico",
    "Application gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Application+gateways.ico",
    "Route Server": "https://azure-favicons-bucket.s3.amazonaws.com/Route+Servers.ico", // Untested
    "Reserved IP address (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
    "Azure Cosmos DB account": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
    "Azure Active Directory": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Active+Directory.ico",
};

// Most of the parameters are the same as the "iconMapperSubtitleText", but with an added 's'
// Maps to icon from title text
iconMapperTitleText = {
    "Resource groups": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+groups.ico",
    "Virtual machines": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine.ico",
    "Recent": "https://azure-favicons-bucket.s3.amazonaws.com/Recent.ico",
    "Management groups": "https://azure-favicons-bucket.s3.amazonaws.com/Management+groups.ico",
    "Subscriptions": "https://azure-favicons-bucket.s3.amazonaws.com/Subscriptions.ico",
    "Marketplace": "https://azure-favicons-bucket.s3.amazonaws.com/Marketplace.ico",
    "Help + support": "https://azure-favicons-bucket.s3.amazonaws.com/Help+%2B+support.ico",
    "Service Health | Service issues": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Health.ico",
    // templates: template-ico
    "Tags": "https://azure-favicons-bucket.s3.amazonaws.com/Tags.ico",
    "What's new": "https://azure-favicons-bucket.s3.amazonaws.com/What's+new.ico",
    "Quickstart Center": "https://azure-favicons-bucket.s3.amazonaws.com/Quickstart+Center.ico",
    "Shared dashboards": "https://azure-favicons-bucket.s3.amazonaws.com/Shared+dashboards.ico",
    "Free services": "https://azure-favicons-bucket.s3.amazonaws.com/Free+services.ico",
    // "Reservations": ""
    "Resource Explorer": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+Explorer.ico",
    "Logic apps": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    "Create Logic App": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    "Logic Apps Designer": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    "Virtual machine scale sets": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
    "Create a virtual machine scale set": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+machine+scale+sets.ico",
    "Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
    "Create Function App": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",
    "App Services": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
    "Create Web App": "https://azure-favicons-bucket.s3.amazonaws.com/App+Service.ico",
    "Container instances": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
    "Create container instance": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
    "Batch accounts": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
    "New Batch account": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
    "Service Fabric clusters": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Fabric+clusters.ico",
    "All resources": "https://azure-favicons-bucket.s3.amazonaws.com/All+resources.ico",
    "Cloud services (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
    "Create a cloud service": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
    "Kubernetes services": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
    "Kubernetes Service": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
    "Create Kubernetes cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
    "Availability sets": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
    "Create availability set": "https://azure-favicons-bucket.s3.amazonaws.com/Availability+sets.ico",
    "Disks (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
    "Create disk": "https://azure-favicons-bucket.s3.amazonaws.com/Disks+(classic).ico",
    "OS images (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
    "VM images (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
    "Create VM image": "https://azure-favicons-bucket.s3.amazonaws.com/OS+images+(classic).ico",
    "Citrix Virtual Apps Essentials": "https://azure-favicons-bucket.s3.amazonaws.com/Citrix+Virtual+Desktops+Essentials.ico",
    "Citrix Virtual Desktops Essentials": "https://azure-favicons-bucket.s3.amazonaws.com/Citrix+Virtual+Desktops+Essentials.ico",
    "SAP HANA on Azure": "https://azure-favicons-bucket.s3.amazonaws.com/SAP+HANA+on+Azure.ico",
    "Proximity placement groups": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
    "Create Proximity Placement Group": "https://azure-favicons-bucket.s3.amazonaws.com/Proximity+placement+groups.ico",
    "Host groups": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
    "Create host group": "https://azure-favicons-bucket.s3.amazonaws.com/Host+groups.ico",
    "Hosts": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico",
    "Create dedicated host": "https://azure-favicons-bucket.s3.amazonaws.com/Hosts.ico",
    "Azure Spring Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Spring+Apps.ico",
    "Application groups": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico",
    "Create an application group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+groups.ico",
    "Maintenance Configurations": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
    "Create a maintenance configurations": "https://azure-favicons-bucket.s3.amazonaws.com/Maintenance+Configurations.ico",
    "Workspaces": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
    "Create a workspace": "https://azure-favicons-bucket.s3.amazonaws.com/Workspaces.ico",
    "Container Apps": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
    "Create Container App": "https://azure-favicons-bucket.s3.amazonaws.com/Container+Apps.ico",
    "Virtual networks": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
    "Virtual networks (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
    "Create virtual network": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+networks.ico",
    "Front Door and CDN profiles": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
    "Create a Front Door profile": "https://azure-favicons-bucket.s3.amazonaws.com/Front+Door+and+CDN+profiles.ico",
    "Network interfaces": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
    "Create network interface": "https://azure-favicons-bucket.s3.amazonaws.com/Network+interfaces.ico",
    "Route tables": "https://azure-favicons-bucket.s3.amazonaws.com/Route+tables.ico",
    "Service endpoint policies": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
    "Create a service endpoint policy": "https://azure-favicons-bucket.s3.amazonaws.com/Service+endpoint+policies.ico",
    "Private Link Center": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
    "Create a private endpoint": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
    "Create private link service": "https://azure-favicons-bucket.s3.amazonaws.com/Private+Link.ico",
    "DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "Create DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "NAT gateways": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
    "Create network address translation (NAT) gateway": "https://azure-favicons-bucket.s3.amazonaws.com/NAT+gateways.ico",
    "Firewall Policies": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
    "Create an Azure Firewall Policy": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Policies.ico",
    "Local network gateways": "https://azure-favicons-bucket.s3.amazonaws.com/Local+network+gateways.ico",
    "Network security groups (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
    "Create network security group": "https://azure-favicons-bucket.s3.amazonaws.com/Network+security+groups.ico",
    "Load balancing": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancing+-+help+me+choose.ico",
    "Azure Synapse Analytics (private link hubs)": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
    "Create Synapse private link hub": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Synapse+Analytics+(private+link+hubs).ico",
    "Network Watcher": "https://azure-favicons-bucket.s3.amazonaws.com/Network+Watcher.ico",
    "Public IP addresses": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
    "Application security groups": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
    "Create an application security group": "https://azure-favicons-bucket.s3.amazonaws.com/Application+security+groups.ico",
    "Private DNS zones": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "Create Private DNS zone": "https://azure-favicons-bucket.s3.amazonaws.com/Private+DNS+zones.ico",
    "Virtual WANs": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
    "Create WAN": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+WANs.ico",
    "Load balancing | Traffic Manager": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
    "Create Traffic Manager profile": "https://azure-favicons-bucket.s3.amazonaws.com/Traffic+Manager+profiles.ico",
    "IP Groups": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
    "Create an IP Group": "https://azure-favicons-bucket.s3.amazonaws.com/IP+Groups.ico",
    "Firewalls": "https://azure-favicons-bucket.s3.amazonaws.com/Firewalls.ico",
    "Service Bus": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Bus.ico",
    "Virtual network gateways": "https://azure-favicons-bucket.s3.amazonaws.com/Virtual+network+gateways.ico",
    "Load balancing | Load Balancer": "https://azure-favicons-bucket.s3.amazonaws.com/Load+balancers.ico",
    "Public IP Prefixes": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+Prefixes.ico",
    "DDoS protection plans": "https://azure-favicons-bucket.s3.amazonaws.com/DDoS+protection+plans.ico",
    "Web Application Firewall policies (WAF)": "https://azure-favicons-bucket.s3.amazonaws.com/Web+Application+Firewall+policies+(WAF).ico",
    "Bastions": "https://azure-favicons-bucket.s3.amazonaws.com/Bastions.ico",
    "Load balancing | Application Gateway": "https://azure-favicons-bucket.s3.amazonaws.com/Application+gateways.ico",
    "Firewall Manager": "https://azure-favicons-bucket.s3.amazonaws.com/Firewall+Manager.ico",
    "Connections": "https://azure-favicons-bucket.s3.amazonaws.com/Connections.ico",
    "Route Servers": "https://azure-favicons-bucket.s3.amazonaws.com/Route+Servers.ico",
    "Reserved IP addresses (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Public+IP+addresses.ico",
    "Storage accounts": "https://azure-favicons-bucket.s3.amazonaws.com/Storage+account.ico",
    "Azure Cosmos DB": "https://azure-favicons-bucket.s3.amazonaws.com/Azure+Cosmos+DB.ico",
    "App registrations": "https://azure-favicons-bucket.s3.amazonaws.com/App+registrations.ico",
};


// Get subtitletext of tab
var subtitleTexts = [].slice.call(document.getElementsByClassName("fxs-blade-title-subtitleText msportalfx-tooltip-overflow fxs-portal-subtext"));
subtitleTexts.reverse()

var titleTexts = [].slice.call(document.getElementsByClassName("fxs-blade-title-titleText msportalfx-tooltip-overflow"));
titleTexts.reverse()

function iconMapper() {
    // If homepage
    if (location.href.includes("portal.azure.com/#home") || location.href.includes("portal.azure.com/#allservices")) {
        // Change to default logo
        changeFavicon("https://azure-favicons-bucket.s3.amazonaws.com/home_400x400.ico");
    }

    // If site has subtitleText - change to match
    for (const subtitleText of subtitleTexts) {
        subText = subtitleText.textContent;
        if (iconMapperSubtitleText.hasOwnProperty(subText)) {
            const element = iconMapperSubtitleText[subText];
            changeFavicon(element);
            return;
        } 
    }

    // If site has TitleText - change to match
    for (const titleText of titleTexts) {
        tiText = titleText.textContent;
        if (iconMapperTitleText.hasOwnProperty(tiText)) {
            const element = iconMapperTitleText[tiText];
            changeFavicon(element);
            return;
        } 
    }

}
iconMapper()


// Otherwise keep current logo until page refresh or until a new page with known favicon is fetched
