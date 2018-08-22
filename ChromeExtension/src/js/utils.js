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
        const [apiUrl, machine] = await Promise.all([
            await LocalStorage.getByKey('apiUrl'),
            await LocalStorage.getByKey('machineName')
        ]);

        return `${apiUrl}/api/slides/${machine}`;
    },
    isNewTab: tab => {
        return new Promise(resolve => {
            resolve(tab && tab.url === "chrome://newtab/");
        });
    }
};
