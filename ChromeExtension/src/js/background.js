chrome.browserAction.onClicked.addListener(tab => {
    initSlideShow(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];
        if (Utils.isNewTab(tabs[0])) {
            initSlideShow(currentTab);
        }
    });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    initSlideShow(null, tabId);
});
