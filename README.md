# UI Repository

![image](https://user-images.githubusercontent.com/110283090/234331550-89f2f821-790a-4fee-95e1-db9b551689e7.png)

File uploading system was created to test my practical skills of C#, Microsoft Azure and front-end.
This app represents a form that takes user's email and a file with '.docx' extension. It sends to the server where API part saves to Azure Blob Storage the file. In case of success azure function is triggered and with SendGrid sends notification about success to the user.

## Installation
To install the UI repository, you can follow these steps:

1. Clone the repository to your local machine using Git.
2. Install Node.js and npm if you haven't already.
3. Navigate to the root of the repository using the command prompt.
4. Run the command npm install to install the dependencies.

## Usage

To use the UI repository, you can follow these steps:

1. Run the command ng serve to start the development server.
2. Navigate to http://localhost:4200/ in your browser to see the application running.

## Deployment

To deploy the UI repository to Azure Web App, you can follow these steps:

1. Create a new Azure Web App for .NET.
2. Navigate to the Deployment Center and choose GitHub as the source.
3. Select the UI repository and configure the deployment options.
4. Wait for the deployment to finish and navigate to the URL of the Azure Web App to see the deployed application.

This repository contains UI part of the application

## Links

In order to see API part follow [this](https://github.com/olehkavetskyi/FileUploadingSystemAPI) link

A link to Azure Web Application - https://fileuploadingsystem.azurewebsites.net (deactivated)
