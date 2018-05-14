import Data from './data.js';
import LocalStorage from './localStorage.js';
import Notification from './notification.js';
import Utils from './utils.js';

export default class SlideShow {
    constructor() {
        this.currentTab = null;
        this.fullscreen = false;
        this.hasConfigSettings = false;
        this.slides = [];
        this.loops = 0;
    }

    async init(tab, closingTabId) {
        await this.getLocalStorage();
        if (closingTabId) await this.resetExtension(closingTabId);
        if (tab && !closingTabId) await this.setCurrentTab(tab);
        if (this.loops === 0) { await this.setFullscreen(); }

        if ((tab || this.currentTab) && this.hasConfigSettings) {
            this.slides = [];
            await Data.fetchDefault().then(data => {
                this.slides = data;
            }).catch(error => {
                console.log(error);
            });

            if (this.slides && this.slides.length > 0) {
                await this.rotateSlides();
            } else {
                Notification.pop("No Data", "Looks like you need some data in your table.");
            }
        } else {
            if (this.currentTab) {
                try {
                    chrome.tabs.update(this.currentTab.id, {
                        url: '/src/content/options.html'
                    });
                } catch(error) {
                    console.log(error);
                }
            } else if ((this.hasConfigSettings) && (this.slides && this.slides.length > 0)) {
                // start it up
                await this.rotateSlides();
            } else {
                Notification.pop('Not set up yet!',
                    'I don\'t have enough configuration to start the show!\n' +
                    'Looks like you may not have the API URI set\n' +
                    'or you don\'t have slides to rotate.');
            }
        }
    }; // end init

    async getLocalStorage() {
        await LocalStorage.get().then(this.setPageFromConfig.bind(this));
    }

    async setPageFromConfig(config) {
        this.hasConfigSettings = !!config.apiUrl;
        this.fullscreen = config.fullscreen || false;
    }

    async resetExtension(closingTabId) {
        if (!this.currentTab) return;
        if (this.currentTab.id === closingTabId) {
            this.currentTab = null;
        }
        return;
    }

    async setCurrentTab(tab) {
        this.currentTab = tab;
        return this.currentTab;
    }

    async setFullscreen() {
        if (this.hasConfigSettings && this.fullscreen) {
            if (Utils.isNewTab(this.currentTab)) {
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
            }
        }
    }

    async rotateSlides() {
        let index = 0;

        this.loops++;
        do {
            index++;
            await this.startSlideTimeout(index);
        } while (index < this.slides.length);
    }

    async startSlideTimeout(index) {
        return new Promise(async resolve => {
            const currentSlide = this.slides[index - 1];
            let timeout = currentSlide.timeout * 1000;
            await this.setContent(currentSlide);
            const timer = await window.setTimeout(() => {
                if (index === this.slides.length && this.currentTab) {
                    this.init(this.currentTab);
                }
                resolve();
            }, timeout)
        });
    }

    async setContent(slide) {
        return new Promise(resolve => {
            try {
                if (this.currentTab) {
                    chrome.tabs.update(this.currentTab.id, {
                        url: slide.httpLink
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        });
    };

    async setPageFromConfig(config) {
        this.hasConfigSettings = !!config.apiUrl;
        this.fullscreen = config.fullscreen || false;
    };
}
