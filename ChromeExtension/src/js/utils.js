const Utils = {
    getCurrentTab: () => {
        return new Promise(resolve => {
            chrome.tabs.getCurrent(tab => {
                resolve(tab.id);
            });
        });
    },
    buildDataQuery: async () => {
        // Get the Machine Name and API from storage
        const api = await LocalStorage.getByKey('apiUrl');
        const machine = await LocalStorage.getByKey('machineName');
        const returnValue = `${api}/api/slides/${machine}`;
        return returnValue;
    }
}
