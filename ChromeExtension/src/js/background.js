chrome.browserAction.onClicked.addListener(tab => {
    initSlideShow(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        initSlideShow(tabs[0]);
    });
});
