import Enums from './enum.js';

export default {
    get: () => {
        return new Promise(resolve => {
            chrome.storage.local.get([
                Enums.API_URL,
                Enums.FULLSCREEN,
                Enums.MACHINE_NAME,
                Enums.TAB_ID
            ], results => {
                resolve(results);
            });
        });
    },
    getByKey: key => {
        return new Promise(resolve => {
            chrome.storage.local.get(key, results => {
                resolve(results[key]);
            });
        });
    },
    set: options => {
        return new Promise(resolve => {
            chrome.storage.local.set(options, () => {
                resolve();
            });
        });
    }
};
