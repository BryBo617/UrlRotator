import LocalStorage from './localStorage.js';
import SlideShow from './slideshow.js';
import Utils from './utils.js';

const slideShow = new SlideShow();

chrome.browserAction.onClicked.addListener(tab => {
    slideShow.init(tab);
});
chrome.tabs.onCreated.addListener(async () => {
    const autoStart = await LocalStorage.getByKey('autoStart').then(result => {
        return result;
    });
    await Utils.getCurrentTab()
        .then(async tab => {
            await Utils.isNewTab(tab)
            .then(result => {
                if (result && autoStart) slideShow.init(tab);
            });
        });
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
    slideShow.resetExtension(tabId);
});
