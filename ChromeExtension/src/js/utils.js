import LocalStorage from './localStorage.js';

export default {
    getCurrentTab: () => {
        return new Promise(resolve => {
            chrome.tabs.getSelected(null, tab => {
                resolve(tab);
            });
        });
    },
    buildDataQuery: async () => {
        // Get the Machine Name and API from storage
        const apiUrl = await LocalStorage.getByKey('apiUrl');
        const machine = await LocalStorage.getByKey('machineName');
        const returnValue = `${apiUrl}/api/slides/${machine}`;
        return returnValue;
    },
    isNewTab: tab => {
        return new Promise(resolve => {
            resolve(tab && tab.url === "chrome://newtab/");
        });
    }
};
