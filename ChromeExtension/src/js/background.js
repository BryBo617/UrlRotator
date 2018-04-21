chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];
        console.log(currentTab.url);
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'chrome://newtab'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
