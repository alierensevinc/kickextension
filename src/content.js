import React from 'react';
import ReactDOM from 'react-dom';
import WatchListButton from './WatchListButton';

// Find the target div element
const targetDiv = document.querySelector('.flex.shrink-0.flex-col.items-end.gap-2');

if (targetDiv) {
    // Render the React component
    ReactDOM.render(<WatchListButton />, targetDiv);
} else {
    console.error('Target div not found');
}