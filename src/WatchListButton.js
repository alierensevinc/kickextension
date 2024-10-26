import React, { useState, useEffect } from 'react';

const WatchListButton = () => {
    const [buttonText, setButtonText] = useState('Add To WatchList');
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        console.log('WatchListButton mounted');

        // Function to update button text based on watch list status
        const updateButtonText = (url) => {
            chrome.storage.sync.get(['watchList'], function(result) {
                const watchList = result.watchList || [];
                if (watchList.some(item => item.url === url)) {
                    setButtonText('Remove From WatchList');
                } else {
                    setButtonText('Add To WatchList');
                }
            });
        };

        // Get the current tab URL
        chrome.runtime.sendMessage({ action: 'getCurrentTabUrl' }, function(response) {
            if (response && response.url) {
                setCurrentUrl(response.url);
                updateButtonText(response.url);
            }
        });

        // Listen for changes in the storage and update the button text
        const handleStorageChange = (changes, areaName) => {
            if (areaName === 'sync' && changes.watchList) {
                updateButtonText(currentUrl);
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            console.log('WatchListButton unmounted');
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, [currentUrl]);

    // Handle button click
    const handleClick = () => {
        // Find the target div and extract the title from the first span
        const targetDiv = document.querySelector('.flex.min-w-0.max-w-full.shrink.gap-1.overflow-hidden');
        const firstSpanTitle = targetDiv ? targetDiv.querySelector('span')?.title : '';

        // Send the data along with the action
        chrome.runtime.sendMessage({
            action: 'toggleWatchList',
            data: {
                url: currentUrl,
                title: firstSpanTitle
            }
        });
    };

    return (
        <button
            style={{
                backgroundColor: '#53FC18',
                color: '#000000',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: '1000',
                fontStyle: 'ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji',
                fontWeight: 'bold'
            }}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
};

export default WatchListButton;