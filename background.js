// // Set alarm for every second
chrome.alarms.create({
    periodInMinutes: 1/ 60
});

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