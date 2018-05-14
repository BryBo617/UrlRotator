import SlideShow from './slideshow.js';
import Utils from './utils.js';

const slideShow = new SlideShow();

chrome.browserAction.onClicked.addListener(tab => {
    slideShow.init(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    await Utils.getCurrentTab()
        .then(async tab => {
            if (await Utils.isNewTab(tab)) {
                slideShow.init(tab);
            }
        });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    slideShow.resetExtension(tabId);
});
