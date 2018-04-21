# UrlRotator
Chrome Extension to rotate intranet pages.

You will need to first set up an internal API server. After getting that running you will need to install the extension into chrome.

## Setting up the API
You will need to download and install the following if they are not already.
1. [.NET Core SDK 2.0 or later](https://www.microsoft.com/net/download/dotnet-core/runtime-2.0.5)
2. [.Net Core 2.x Windows Server Hosting](https://www.microsoft.com/net/download/dotnet-core/runtime-2.0.5)
3. Navigate to the where ever you have the UrlRotator project.
3. build the UrlRotator.WebApi
    ```
    dotnet publish -c Release -o C:\UrlRotator\published
    ```
4. Add a new website in IIS and set the Physical path to the same place you published to.

## Installing Chrome Extension
follow these steps to install the extension.
1. Open Chrome. Click the menu to customize and control Chrome.
2. Hover over More tools >, then select Extensions.
3. Turn on Developer mode.
4. Click LOAD UNPACKED
5. Navigate to the folder with the Chrome Extension and select it.
6. Click Ok.

## Configuring the Chrome Extension.
You should see the extension show up just to the right of the address bar. Right click it and select options.
The Machine Name is so you can query the api with a query term. If you leave that blank, it will query all slides.
The Api URL is a required configuration property.
