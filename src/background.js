chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleWatchList') {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const url = tabs[0].url;
            if (url) {
                chrome.storage.sync.get(['watchList'], function(result) {
                    let watchList = result.watchList || [];
                    if (watchList.includes(url)) {
                        // Remove URL from watch list
                        watchList = watchList.filter(item => item !== url);
                        chrome.storage.sync.set({ watchList: watchList }, function() {
                            console.log('URL removed from watch list:', url);
                        });
                    } else {
                        // Add URL to watch list
                        watchList.push(url);
                        chrome.storage.sync.set({ watchList: watchList }, function() {
                            console.log('URL added to watch list:', url);
                        });
                    }
                });
            } else {
                console.error('Unable to retrieve the URL.');
            }
        });
    } else if (request.action === 'getCurrentTabUrl') {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const url = tabs[0].url;
            sendResponse({ url: url });
        });
        return true; // Keep the message channel open for sendResponse
    }
});