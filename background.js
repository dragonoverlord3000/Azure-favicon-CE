chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if ((tab.url).includes("https://portal.azure.com/") || (tab.url).includes("https://endpoint.microsoft.com/")) {
        chrome.scripting.executeScript({
            "target": {"tabId": tab.id},
            "files": ["contentScript.js"]
        })
} }); 
 
 chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if ((tab.url).includes("https://portal.azure.com/") || (tab.url).includes("https://endpoint.microsoft.com/")) {
            chrome.scripting.executeScript({
                "target": {"tabId": tab.id},
                "files": ["contentScript.js"]
            });
        };
     });
 }); 

 chrome.runtime.onInstalled.addListener((details) => {
    chrome.tabs.query({}, (tabs) => {
        
        for (tab of tabs) {
            console.log(tab.url)
            // Execute content script
            if ((tab.url).includes("https://portal.azure.com/") || (tab.url).includes("https://endpoint.microsoft.com/")) {
                chrome.scripting.executeScript({
                    "target": {"tabId": tab.id},
                    "files": ["contentScript.js"]
                })
            }
        }
    });
});
