const Notification = {
    pop: (title = 'Oops!', message = 'WHAT DID YOU DO!') => {
        chrome.notifications.create("urlRotator.options.error", {
            iconUrl: "../../favicon.png",
            message,
            title,
            type: "basic",
        });
    }
}
