const LocalStorage = {
    get: () => {
        return new Promise(resolve => {
            chrome.storage.local.get([
                Enums.storageItems.API_URL,
                Enums.storageItems.FULLSCREEN,
                Enums.storageItems.MACHINE_NAME,
                Enums.storageItems.TAB_ID
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
