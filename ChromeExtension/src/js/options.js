import LocalStorage from './localStorage.js';
import Notification from './notification.js';
import Utils from './utils.js';

let apiUrlTxt;
let autoStart;
let launchInFullScreen;
let machineNameTxt;
let saveBtn;

const getDomElements = () => {
    return new Promise(resolve => {
        apiUrlTxt = document.getElementById('apiUrlTxt');
        autoStart = document.getElementById('autoStartSlideShow');
        launchInFullScreen = document.getElementById('launchInFullScreenCheckbox');
        machineNameTxt = document.getElementById('machineNameTxt');
        saveBtn = document.getElementById('saveOptionsBtn');
        resolve();
    });
}

const addEventListeners = () => {
    return new Promise(resolve => {
        if(saveBtn) {
            saveBtn.addEventListener('click', saveToStorage);
        }
        resolve();
    });
}

const setSavedSettings = async () => {
    const config = await LocalStorage.get().then(results => {
        apiUrlTxt.value = results.apiUrl || '';
        autoStart.checked = results.autoStart || true;
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

const saveToStorage = () => {
    if (!isValidForm()) {
        alert('Please set up your extension with a query term and API Url.');
    } else {
        const save = LocalStorage.set({
            apiUrl: apiUrlTxt.value,
            autoStart: autoStart.checked,
            fullscreen: launchInFullScreen.checked,
            machineName: machineNameTxt.value
        })
        .then(setSavedSettings)
        .then(Notification.pop('Sweet!', 'That was lucky. You saved it man, thanks!'));
    }
};

export default (async () => {
    await getDomElements();
    await addEventListeners();
    await setSavedSettings();
})();
