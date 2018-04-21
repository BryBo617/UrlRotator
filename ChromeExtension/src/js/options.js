let apiUrlTxt;
let launchInFullScreen;
let machineNameTxt;
let saveBtn;
let startBtn;

const getDomElements = () => {
    return new Promise(resolve => {
        apiUrlTxt = document.getElementById('apiUrlTxt');
        launchInFullScreen = document.getElementById('launchInFullScreenCheckbox');
        machineNameTxt = document.getElementById('machineNameTxt');
        saveBtn = document.getElementById('saveOptionsBtn');
        startBtn = document.getElementById('startSlideShowBtn');
        resolve();
    });
}

const addEventListeners = () => {
    return new Promise(resolve => {
        if(saveBtn) {
            saveBtn.addEventListener('click', saveToStorage);
        }
        if (startBtn) {
            startBtn.addEventListener('click', startSlideShow);
        }
        resolve();
    });
}

const setSavedSettings = async () => {
    const config = await LocalStorage.get().then(results => {
        apiUrlTxt.value = results.apiUrl || '';
        launchInFullScreen.checked = results.fullscreen || false;
        machineNameTxt.value = results.machineName || '';
    });
}

const isValidForm = () => {
    let results = true;
    if (apiUrlTxt.value === '') {
        results = false;
    }
    return results;
}

const startSlideShow = () => {
    Utils.getCurrentTab()
    .then(tabId => {
        chrome.tabs.update(tabId, { url: '/src/content/slideshow.html' }, () => { });
    });
};

const saveToStorage = () => {
    if (!isValidForm()) {
        alert('Please set up your extension with a query term and API Url.');
    } else {
        const save = LocalStorage.set({
            apiUrl: apiUrlTxt.value,
            fullscreen: launchInFullScreen.checked,
            machineName: machineNameTxt.value
        })
        .then(setSavedSettings)
        .then(Notification.pop('Sweet!', 'That was lucky. You saved it man, thanks!'));
    }
};

(async () => {
    await getDomElements();
    await addEventListeners();
    await setSavedSettings();
})();
