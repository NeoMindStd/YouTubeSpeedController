// Function to add the speed control input next to the YouTube search box
function addSpeedControlInput() {
    const searchBox = document.querySelector('ytd-searchbox');
    if (searchBox && !document.getElementById('speedControlInput')) {
        const speedControlDiv = document.createElement('div');
        speedControlDiv.style.display = 'inline-block';
        speedControlDiv.style.marginRight = '10px';

        const speedInput = document.createElement('input');
        speedInput.type = 'text';
        speedInput.id = 'speedControlInput';
        speedInput.placeholder = 'Speed (e.g., 1.5)';
        speedInput.style.padding = '5px';
        speedInput.style.fontSize = '14px';
        speedControlDiv.appendChild(speedInput);

        searchBox.insertAdjacentElement('beforebegin', speedControlDiv);

        speedInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const speed = parseFloat(speedInput.value);
                if (!isNaN(speed)) {
                    setPlaybackSpeed(speed);
                }
            }
        });
    }
}

// Function to display the current playback speed in the input field
function displayCurrentSpeed() {
    const video = document.querySelector('video');
    if (video) {
        const speedInput = document.getElementById('speedControlInput');
        if (speedInput) {
            speedInput.value = video.playbackRate;
        }
    }
}

// Function to set the playback speed of the video
function setPlaybackSpeed(speed) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = speed;
    }
}

// Observe DOM changes and call the function to add the input field
const observer = new MutationObserver(() => {
    addSpeedControlInput();
    displayCurrentSpeed();
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial call to add the input field and display current speed
addSpeedControlInput();
displayCurrentSpeed();
