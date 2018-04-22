# UrlRotator
Chrome Extension to rotate intranet pages.

You will need to first setup the internal API server. Then we will install the chrome extension in developer mode.
After it has been installed, you will set a couple of settings. Finally, click the extension icon.

## Setting up the API
You will need to download and install the following if they are not already.
1. [.NET Core SDK 2.0 or later](https://www.microsoft.com/net/download/dotnet-core/runtime-2.0.5)
2. [.Net Core 2.x Windows Server Hosting](https://www.microsoft.com/net/download/dotnet-core/runtime-2.0.5)
3. Navigate to the directory you cloned - *UrlRotator\UrlRotator-WebApi* - and open a cmd window.
4. the code below will build the UrlRotator.sln
    ```
    dotnet publish -c Release -o C:\UrlRotator\published
    ```
5. Create a website in IIS.
6. Change the appsettings.json DefaultConnection for your Sql Server instance and security requirements.
    ```
    "ConnectionStrings": {
        "DefaultConnection": "Server={yourServer};Database={yourDatabase};Trusted_Connection=True;"
    },
    ```

## Installing Chrome Extension
follow these steps to install the extension.
1. Open Chrome. Click the menu to customize and control Chrome.
2. Hover over More tools >, then select Extensions.
3. Turn on Developer mode. It is a top right toggle button.
4. Click *LOAD UNPACKED*
5. Navigate to the folder with the Chrome Extension and select it.
6. Click Ok.

## Configuring the Chrome Extension.
You should see the extension show up just to the right of the address bar. Right click it and select options.
The Machine Name is so you can query the api with a query term. If you leave that blank, it will query all slides.
The Api URL is a required configuration property.
