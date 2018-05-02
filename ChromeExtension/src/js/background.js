import SlideShow from './slideshow.js';
import Utils from './utils.js';

chrome.browserAction.onClicked.addListener(tab => {
    SlideShow.init(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    await Utils.getCurrentTab()
        .then(async tab => {
            if (await Utils.isNewTab(tab)) {
                SlideShow.init(tab);
            }
        });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    SlideShow.init(null, tabId);
});
