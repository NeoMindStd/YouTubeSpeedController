document.addEventListener('DOMContentLoaded', () => {
    const speedInput = document.getElementById('speed');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: getCurrentPlaybackSpeed,
            },
            (results) => {
                if (results && results[0]) {
                    speedInput.value = results[0].result;
                }
            }
        );
    });

    document.getElementById('setSpeedButton').addEventListener('click', () => {
        const speed = parseFloat(speedInput.value);
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
});

function getCurrentPlaybackSpeed() {
    const video = document.querySelector('video');
    return video ? video.playbackRate : null;
}

function setPlaybackSpeed(speed) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = speed;
    }
}
