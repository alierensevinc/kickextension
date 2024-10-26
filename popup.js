document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const urlList = document.getElementById('urlList');

    // Load the saved URLs when the popup is opened
    chrome.storage.sync.get(['watchList'], function(result) {
        const watchList = result.watchList || [];
        watchList.forEach(url => addUrlToList(url));
    });

    // Add the current tab's URL to the watch list when the button is clicked
    addButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const url = tabs[0].url;
            if (url) {
                addUrl(url);
            } else {
                console.error('Unable to retrieve the URL.');
            }
        });
    });

    // Function to add a URL to the watch list
    function addUrl(url) {
        chrome.storage.sync.get(['watchList'], function(result) {
            const watchList = result.watchList || [];
            if (!watchList.includes(url)) {
                watchList.push(url);
                chrome.storage.sync.set({ watchList: watchList }, function() {
                    addUrlToList(url);
                });
            }
        });
    }

    // Function to add a URL to the list in the popup
    function addUrlToList(url) {
        const urlItem = document.createElement('div');
        urlItem.className = 'url-item';

        const a = document.createElement('a');
        a.href = url;
        a.textContent = url.length > 30 ? url.substring(0, 30) + '...' : url; // Trim the URL if it's too long
        a.target = '_blank'; // Open link in a new tab

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', function() {
            chrome.storage.sync.get(['watchList'], function(result) {
                const watchList = result.watchList || [];
                const updatedList = watchList.filter(item => item !== url);
                chrome.storage.sync.set({ watchList: updatedList }, function() {
                    urlList.removeChild(urlItem);
                });
            });
        });

        urlItem.appendChild(a);
        urlItem.appendChild(deleteButton);
        urlList.appendChild(urlItem);
    }
});