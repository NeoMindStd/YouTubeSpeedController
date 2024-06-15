// Function to add the speed control input next to the YouTube search box
function addSpeedControlInput() {
    const searchBox = document.querySelector('ytd-searchbox');
    if (searchBox && !document.getElementById('speedControlInput')) {
        const speedControlDiv = document.createElement('div');
        speedControlDiv.id = 'speedControlDiv';
        speedControlDiv.style.display = 'inline-flex';
        speedControlDiv.style.alignItems = 'center';
        speedControlDiv.style.marginRight = '10px';

        const speedLabel = document.createElement('span');
        speedLabel.textContent = 'Play Speed:';
        speedLabel.style.marginRight = '8px';
        speedLabel.style.fontSize = '14px';
        speedLabel.style.fontWeight = 'bold';
        speedLabel.style.color = '#333';

        const speedInput = document.createElement('input');
        speedInput.type = 'text';
        speedInput.id = 'speedControlInput';
        speedInput.placeholder = 'e.g., 1.5';
        speedInput.style.padding = '5px';
        speedInput.style.fontSize = '14px';
        speedInput.style.width = '60px';
        speedInput.style.border = '1px solid #ccc';
        speedInput.style.borderRadius = '4px';
        speedInput.style.marginRight = '5px';

        const setSpeedButton = document.createElement('button');
        setSpeedButton.textContent = 'Set';
        setSpeedButton.style.padding = '5px 10px';
        setSpeedButton.style.fontSize = '14px';
        setSpeedButton.style.border = 'none';
        setSpeedButton.style.borderRadius = '4px';
        setSpeedButton.style.backgroundColor = '#ff0000';
        setSpeedButton.style.color = '#fff';
        setSpeedButton.style.cursor = 'pointer';

        speedControlDiv.appendChild(speedLabel);
        speedControlDiv.appendChild(speedInput);
        speedControlDiv.appendChild(setSpeedButton);

        searchBox.parentNode.insertBefore(speedControlDiv, searchBox);

        const setSpeed = () => {
            const speed = parseFloat(speedInput.value);
            if (!isNaN(speed)) {
                setPlaybackSpeed(speed);
            }
        };

        speedInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                setSpeed();
            }
        });

        setSpeedButton.addEventListener('click', setSpeed);
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

// Listen for video play event to update speed input
document.addEventListener('play', (event) => {
    if (event.target.tagName === 'VIDEO') {
        displayCurrentSpeed();
    }
}, true);
