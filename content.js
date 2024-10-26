// Find the target div element
const targetDiv = document.querySelector('.flex.shrink-0.flex-col.items-end.gap-2');

if (targetDiv) {
    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Add To WatchList';
    button.style.backgroundColor = '#53FC18';
    button.style.color = '#000000';
    button.style.border = 'none';
    button.style.padding = '10px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';
    button.style.fontStyle = "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji";
    button.style.fontWeight = "bold";

    // Add hover style
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#45D017';
    });

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#53FC18';
    });

    // Add click style
    button.addEventListener('mousedown', () => {
        button.style.backgroundColor = '#3EBF14';
    });

    button.addEventListener('mouseup', () => {
        button.style.backgroundColor = '#45D017';
    });

    // Add click event to the button
    button.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'addUrl' });
    });

    // Append the button to the target div
    targetDiv.appendChild(button);
} else {
    console.error('Target div not found');
}Ï