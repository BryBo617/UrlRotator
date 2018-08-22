import LocalStorage from './localStorage.js';
import Notification from './notification.js';
import SlideShow from './slideshow.js';
import Utils from './utils.js';

const slideShow = new SlideShow();
chrome.browserAction.onClicked.addListener(tab => {
    slideShow.init(tab);
});

const onStartOrCreated = async () => {
    const currentTab = await Utils.getCurrentTab().then(t => { return t; });
    const autoStart = await LocalStorage.getByKey('autoStart').then(result => {
        return result;
    });
    const isNewTab = await Utils.isNewTab(currentTab).then(result => { return result; });

    if (currentTab) {
        if (autoStart && isNewTab) {
            slideShow.init(currentTab);
        } else {
            Notification.pop(
                'UrlRotator',
                `If you want the slide show, start it by clicking the icon, or change your settings to auto start.`
            );
        }
    } else {
        Notification.pop('Error', 'We don\'t have a tab to use.');
    }
}

chrome.runtime.onStartup.addListener(async () => {
    onStartOrCreated();
});

chrome.tabs.onCreated.addListener(async () => {
    onStartOrCreated();
});

chrome.tabs.onRemoved.addListener((tabId, info) => {
    slideShow.resetExtension(tabId);
});
