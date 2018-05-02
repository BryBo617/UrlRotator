export default {
    getCurrentTab: () => {
        return new Promise(resolve => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                resolve(tabs[0]);
            });
        });
    },
    buildDataQuery: async () => {
        // Get the Machine Name and API from storage
        const api = await LocalStorage.getByKey('apiUrl');
        const machine = await LocalStorage.getByKey('machineName');
        const returnValue = `${api}/api/slides/${machine}`;
        return returnValue;
    },
    isNewTab: tab => {
        return tab && tab.url === "chrome://newtab/";
    }
};
