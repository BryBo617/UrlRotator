const Data = {
    fetchDefault: async () => {
        const uri = await Utils.buildDataQuery();
        return fetch(uri);
    }
}
