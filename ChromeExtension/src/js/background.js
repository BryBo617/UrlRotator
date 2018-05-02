chrome.browserAction.onClicked.addListener(tab => {
    initSlideShow(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        initSlideShow(tabs[0]);
    });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    initSlideShow(null, tabId);
});
