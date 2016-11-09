# Falcor GitHubUser example

This is an example project to show how to fetch data with falcor. As database the GitHub Api is used.

## Technologies
* Angular
* Node
* Falcor

## Project structure
The project consists of two programs. The server and the client.

The server is an falcor wrapper for the GitHub API.

The client is an angular application that shows an GitHub user.

## Server

### How to install dependencies
`cd server`

`npm install`

### How to start
`npm run start`


## Client

### How to install dependencies
`cd client`

`npm install`

### How to start
`npm run start`

## Known Errors

### Limited GitHub Requests

When your GitHub request limit is reached, create a GitHub token. Then use the `setToken` function on gitlab-lib to set your token for further requests.
