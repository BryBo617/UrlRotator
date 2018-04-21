let currentTabId;
let fullscreen;
let hasConfigSettings;
let urlRotatorContent;
let slides = [];

const getElements = () => {
    return new Promise(resolve => {
        urlRotatorContent = document.getElementById('urlRotatorContent');
        resolve();
    });
};

const initSlideShow = async () => {
    await getLocalStorage();
    if (hasConfigSettings) {
        slides = [];
        await Data.fetchDefault()
            .then(response => {
                return response.json();
            })
            .then(data => {
                slides = data;
            });

        if (slides && slides.length > 0) {
            await setFullscreen();
            rotateSlides();
        } else {
            Notification.pop("No Data", "Looks like you need some data in your table.");
        }
    } else {
        chrome.tabs.update(currentTabId, {
                url: '/src/content/options.html'
            },
            () => { } // required, I think. I should check.
        );
    }
};

const rotateSlides = async () => {
    let index = 0;
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

        window.setTimeout(() => {
            if (index === slides.length) {
                initSlideShow();
            }
            resolve();
        }, timeout)
    });
};

const setContent = async slide => {
    return new Promise(async resolve => {
        await fetch(slide.httpLink)
        .then(response => {
            return response.text();
        })
        .then(content => {
            urlRotatorContent.innerHTML = content;
            resolve();
        });
    });
};

const setCurrentTab = async () => {
    await Utils.getCurrentTab()
    .then(tabId => {
        currentTabId = tabId
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
            chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
        }
        resolve();
    });
};

(async () => {
    await getElements();
    await setCurrentTab();
    initSlideShow();
})();
