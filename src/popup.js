document.addEventListener('DOMContentLoaded', function () {
    const urlList = document.getElementById('urlList');

    // Load the saved URLs when the popup is opened
    chrome.storage.sync.get(['watchList'], function (result) {
        const watchList = result.watchList || [];
        watchList.forEach(item => addUrlToList(item));
    });

    // Function to add a URL to the list in the popup
    function addUrlToList(item) {
        const urlItem = document.createElement('div');
        urlItem.className = 'url-item list-group-item';
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.title; // Remove truncation logic
        a.target = '_blank'; // Open link in a new tab

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', function () {
            chrome.storage.sync.get(['watchList'], function (result) {
                const watchList = result.watchList || [];
                const updatedList = watchList.filter(i => i.url !== item.url);
                chrome.storage.sync.set({watchList: updatedList}, function () {
                    urlList.removeChild(urlItem);
                });
            });
        });

        urlItem.appendChild(a);
        urlItem.appendChild(deleteButton);
        urlList.appendChild(urlItem);
    }
});