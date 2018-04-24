chrome.browserAction.onClicked.addListener(tab => {
    initSlideShow(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    await Utils.getCurrentTab()
        .then(async tab => {
            if (await Utils.isNewTab(tab)) {
                initSlideShow(tab);
            }
        });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    initSlideShow(null, tabId);
});
