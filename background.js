chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'addUrl') {
        console.log(request.action);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const url = tabs[0].url;
            if (url) {
                chrome.storage.sync.get(['watchList'], function(result) {
                    const watchList = result.watchList || [];
                    if (!watchList.includes(url)) {
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
    }
});