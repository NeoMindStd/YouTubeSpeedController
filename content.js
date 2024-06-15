// Function to add the speed control input inside the end element
function addSpeedControlInput() {
    const endElement = document.querySelector('#end.style-scope.ytd-masthead');
    if (endElement && !document.getElementById('speedControlDiv')) {
        const speedControlDiv = document.createElement('div');
        speedControlDiv.id = 'speedControlDiv';
        speedControlDiv.style.display = 'inline-flex';
        speedControlDiv.style.alignItems = 'center';
        speedControlDiv.style.marginRight = '10px';

        const speedLabel = document.createElement('span');
        speedLabel.textContent = 'Play Speed(0.0625~16):';
        speedLabel.style.marginRight = '8px';
        speedLabel.style.fontSize = '14px';
        speedLabel.style.fontWeight = 'bold';
        speedLabel.style.color = '#606060'; // Matching YouTube's search label color

        const speedInput = document.createElement('input');
        speedInput.type = 'text';
        speedInput.id = 'speedControlInput';
        speedInput.placeholder = 'e.g., 1.5';
        speedInput.style.padding = '0 16px';
        speedInput.style.fontSize = '14px';
        speedInput.style.height = '30px'; // Adjusted height to match YouTube search input height
        speedInput.style.width = '80px';
        speedInput.style.border = '1px solid #606060'; // Matching YouTube search input border
        speedInput.style.borderRadius = '20px'; // RoundedRect shape for both corners
        speedInput.style.marginRight = '0px';
        speedInput.style.backgroundColor = '#00000000'; // Matching YouTube search button background
        speedInput.style.color = '#606060'; // Matching YouTube's search label color

        const setSpeedButton = document.createElement('button');
        setSpeedButton.textContent = 'Set';
        setSpeedButton.style.color = '#606060'; // Matching YouTube's search label color
        setSpeedButton.style.padding = '0 10px';
        setSpeedButton.style.fontSize = '14px';
        setSpeedButton.style.border = '1px solid #606060'; // Matching YouTube search input border
        setSpeedButton.style.borderRadius = '20px';
        setSpeedButton.style.height = '30px'; // Matching YouTube search button height
        setSpeedButton.style.backgroundColor = '#ffffff11'; // Matching YouTube search button background
        setSpeedButton.style.color = '#999'; // Matching YouTube search button text color
        setSpeedButton.style.cursor = 'pointer';

        speedControlDiv.appendChild(speedLabel);
        speedControlDiv.appendChild(speedInput);
        speedControlDiv.appendChild(setSpeedButton);

        // Insert speedControlDiv as the first child of endElement
        endElement.insertBefore(speedControlDiv, endElement.firstChild);

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

// Function to remove the speed control input
function removeSpeedControlInput() {
    const speedControlDiv = document.getElementById('speedControlDiv');
    if (speedControlDiv) {
        speedControlDiv.remove();
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

// Function to check if the current page is a YouTube watch page
function isWatchPage() {
    return window.location.pathname.startsWith('/watch');
}

// Observe DOM changes and call the function to add or remove the input field
const observer = new MutationObserver(() => {
    if (isWatchPage()) {
        addSpeedControlInput();
        displayCurrentSpeed();
    } else {
        removeSpeedControlInput();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial call to add or remove the input field
if (isWatchPage()) {
    addSpeedControlInput();
    displayCurrentSpeed();
} else {
    removeSpeedControlInput();
}

// Listen for window resize event to add or remove the input field based on the width
window.addEventListener('resize', () => {
    if (isWatchPage()) {
        if (window.innerWidth > 1000) {
            addSpeedControlInput();
        } else {
            removeSpeedControlInput();
        }
    }
});

// Listen for video play event to update speed input
document.addEventListener('play', (event) => {
    if (event.target.tagName === 'VIDEO') {
        displayCurrentSpeed();
    }
}, true);
