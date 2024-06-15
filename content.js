chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setSpeed') {
        const video = document.querySelector('video');
        if (video) {
            video.playbackRate = message.speed;
        }
    }
});