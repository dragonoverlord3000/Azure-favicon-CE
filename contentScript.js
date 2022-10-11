// console.log(`Current URL = ${window.location.href}`)

/*
    - TODO:
1. Add regular title to search - favicon doesn't change when at selection page for resource
e.g. "https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade"

2. Update on url-change, not using alarm API
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

// Structure: {"Parameter to search for in subtitle": "favicon url"}
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
    // "Private dashboard": "https://azure-favicons-bucket.s3.amazonaws.com/Shared+dashboards.ico"
    "Container instances": "https://azure-favicons-bucket.s3.amazonaws.com/Container+instances.ico",
    "Batch account": "https://azure-favicons-bucket.s3.amazonaws.com/Batch+accounts.ico",
    // Untested
    "Service Fabric cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Service+Fabric+clusters.ico",
    "Cloud service (classic)": "https://azure-favicons-bucket.s3.amazonaws.com/Cloud+services+(classic).ico",
};

// Most of the parameters are the same as the "iconMapperSubtitleText", but with an added 's'
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
    "Create Kubernetes cluster": "https://azure-favicons-bucket.s3.amazonaws.com/Kubernetes+services.ico",
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

    for (const subtitleText of subtitleTexts) {
        subText = subtitleText.textContent;
        
        // If site has subtitleText - change to match
        if (iconMapperSubtitleText.hasOwnProperty(subText)) {
            const element = iconMapperSubtitleText[subText];
            changeFavicon(element);
            return;
        } 
    }

    for (const titleText of titleTexts) {
        tiText = titleText.textContent;
        // If site has TitleText - change to match
        if (iconMapperTitleText.hasOwnProperty(tiText)) {
            const element = iconMapperTitleText[tiText];
            changeFavicon(element);
            return;
        } 
    }
}
iconMapper()


// Otherwise keep current logo until page refresh or until a new page with known favicon is fetched
