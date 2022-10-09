// console.log(`Current URL = ${window.location.href}`)

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

// Structure: {"Parameter to search for in url": "favicon url"}

/* 
Note that the elements in "iconMapper" are used/tested in the order they are listed, 
so this order is very important --> Have individual services listed first, then
for services that can contain other services, list them accordingly
*/

iconMapper = {
    // Individual services
    "Microsoft.Logic": "https://azure-favicons-bucket.s3.amazonaws.com/Logic+app+designer.ico",
    "Microsoft.KeyVault": "https://azure-favicons-bucket.s3.amazonaws.com/Key+vault.ico",
    "Microsoft.Web": "https://azure-favicons-bucket.s3.amazonaws.com/Function+App.ico",

    // Services with hiearchy
    "resourceGroups": "https://azure-favicons-bucket.s3.amazonaws.com/Resource+groups.ico",
    
    // default ;)
    "portal.azure": "https://azure-favicons-bucket.s3.amazonaws.com/pikachu.ico"
}

for (const iconKey of Object.keys(iconMapper)) {
    // If icon key in url change favicon
    if ((location.href).includes(iconKey)) {

        // Change favicon
        changeFavicon(iconMapper[iconKey])
        // console.log(`Changed icon to ${iconKey}`)

        // Only change to first match
        break;
    }
}

// changeFavicon("./icons/favicon.ico")
