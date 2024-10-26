import React, { useState, useEffect } from 'react';

const WatchListButton = () => {
    const [buttonText, setButtonText] = useState('Add To WatchList');
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Function to update button text based on watch list status
        const updateButtonText = (url) => {
            chrome.storage.sync.get(['watchList'], function(result) {
                const watchList = result.watchList || [];
                if (watchList.includes(url)) {
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
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, [currentUrl]);

    // Handle button click
    const handleClick = () => {
        chrome.runtime.sendMessage({ action: 'toggleWatchList' });
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