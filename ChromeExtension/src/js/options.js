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
        autoStart.checked = results.autoStart;
        launchInFullScreen.checked = results.fullscreen;
        machineNameTxt.value = results.machineName || '';
    });
}

const isValidForm = () => {
    if (apiUrlTxt.value === '') {
        return false;
    }
    return true;
}

const saveToStorage = () => {
    if (!isValidForm()) {
        alert('API Url is a required field. Please supply a value.');
    } else {
        const save = LocalStorage.set({
            apiUrl: apiUrlTxt.value,
            autoStart: autoStart.checked,
            fullscreen: launchInFullScreen.checked,
            machineName: machineNameTxt.value
        })
        .then(setSavedSettings)
        .then(Notification.pop('Sweet!', 'That was lucky. You saved it man. Thanks!'));
    }
};

export default (async () => {
    await getDomElements();
    await addEventListeners();
    await setSavedSettings();
})();
