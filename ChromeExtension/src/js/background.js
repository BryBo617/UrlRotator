chrome.browserAction.onClicked.addListener(tab => {
    initSlideShow(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];
        if (currentTab.url === "chrome://newtab/") {
            initSlideShow(currentTab);
        }
    });
});
