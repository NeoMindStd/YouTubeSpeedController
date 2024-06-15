document.getElementById('setSpeedButton').addEventListener('click', () => {
    const speed = parseFloat(document.getElementById('speed').value);
    if (!isNaN(speed)) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [speed]
            });
        });
    }
});

function setPlaybackSpeed(speed) {
    document.querySelector('video').playbackRate = speed;
}