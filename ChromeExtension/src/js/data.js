import Utils from './utils.js';

export default {
    fetchDefault: async () => {
        const uri = await Utils.buildDataQuery();
        return fetch(uri);
    }
};
