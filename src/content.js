import React from 'react';
import ReactDOM from 'react-dom';
import WatchListButton from './WatchListButton';

// Find the target div element
const targetDiv = document.querySelector('.flex.shrink-0.flex-col.items-end.gap-2');

if (targetDiv) {
    console.log('Target div found, rendering WatchListButton');

    // Create a new div to hold the WatchListButton
    const buttonContainer = document.createElement('div');

    // Append the new div to the target div
    targetDiv.appendChild(buttonContainer);

    // Render the React component inside the new div
    ReactDOM.render(<WatchListButton />, buttonContainer);
} else {
    console.error('Target div not found');
}