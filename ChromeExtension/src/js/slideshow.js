let currentTab;
let fullscreen;
let hasConfigSettings;
let urlRotatorContent;
let slides = [];
let loops = 0;

const initSlideShow = async (tab, closingTabId) => {
    await getLocalStorage();
    if (closingTabId) await resetExtension(closingTabId);
    if (tab && !closingTabId) await setCurrentTab(tab);
    if (loops === 0) { await setFullscreen(); }

    if ((tab || currentTab) && hasConfigSettings) {
        slides = [];
        await Data.fetchDefault()
            .then(response => {
                return response.json();
            })
            .then(data => {
                slides = data;
            });

        if (slides && slides.length > 0) {
            rotateSlides();
        } else {
            Notification.pop("No Data", "Looks like you need some data in your table.");
        }
    } else {
        if (currentTab) {
            try {
                chrome.tabs.update(currentTab.id, {
                    url: '/src/content/options.html'
                });
             } catch(error) {
                 console.log(error);
             }

        }
    }
};

const resetExtension = closingTabId => {
    return new Promise(async resolve => {
        if (currentTab.id === closingTabId) {
            currentTab = null;
        }
        resolve();
    });
}

const rotateSlides = async () => {
    let index = 0;

    loops++;
    do {
        index++;
        await startSlideTimeout(index);
    } while (index < slides.length);
};

const startSlideTimeout = index => {
    return new Promise(async resolve => {
        const currentSlide = slides[index - 1];
        let timeout = currentSlide.timeout * 1000;
        await setContent(currentSlide);
        const timer = window.setTimeout(() => {
            if (index === slides.length && currentTab) {
                initSlideShow(currentTab);
            }
            resolve();
        }, timeout)
    });
};

const setContent = async slide => {
    return new Promise(async resolve => {
        try {
            if (currentTab) {
                chrome.tabs.update(currentTab.id, {
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

const setCurrentTab = tab => {
    return new Promise(async resolve => {
        currentTab = tab;
        resolve();
    });
};

const setPageFromConfig = config => {
    hasConfigSettings = !!config.apiUrl;
    fullscreen = config.fullscreen || false;
};

const getLocalStorage = async () => {
    const config = await LocalStorage.get().then(setPageFromConfig);
};

const setFullscreen = () => {
    return new Promise(resolve => {
        if (hasConfigSettings && fullscreen) {
            if (Utils.isNewTab(currentTab)) {
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
            }
        }
        resolve();
    });
};

(async () => {
    initSlideShow();
})();
