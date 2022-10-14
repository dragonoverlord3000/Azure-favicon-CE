// // Set alarm for every second
chrome.alarms.create({
    periodInMinutes: 1/ 60
});

// When chromextension is installed
// chrome.runtime.onInstalled.addListener((details) => {
//     // Get all tabs currently open
//     chrome.tabs.query({}, (tabs) => {
        
//         for (tab of tabs) {
//             console.log(tab.url)
//             // Execute content script
//             if ((tab.url).includes("https://portal.azure.com/")) {
//                 chrome.scripting.executeScript({
//                     "target": {"tabId": tab.id},
//                     "files": ["contentScript.js"]
//                 })
//             }
//         }
//     } );
//     }
// );


// // When a tab is updated
// chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, _tab) => {
//     // Get all tabs currently open
//     chrome.tabs.query({}, (tabs) => {
        
//         for (tab of tabs) {
//             console.log(tab.url)
//             // Execute content script
//             if ((tab.url).includes("https://portal.azure.com/")) {
//                 chrome.scripting.executeScript({
//                     "target": {"tabId": tab.id},
//                     "files": ["contentScript.js"]
//                 })
//             }
//         }
//     } );
//     }
// );




// // Run updater every second
chrome.alarms.onAlarm.addListener((alarm) => {
    // Get all tabs currently open
    chrome.tabs.query({}, (tabs) => {
        
        for (tab of tabs) {
            console.log(tab.url)
            // Execute content script
            if ((tab.url).includes("https://portal.azure.com/")) {
                chrome.scripting.executeScript({
                    "target": {"tabId": tab.id},
                    "files": ["contentScript.js"]
                })
            }
        }
    });
})
;