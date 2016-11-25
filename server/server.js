var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var fetch = require('node-fetch');
var express = require('express');
var cors = require('cors');

var database = require('github-lib');
var gitHubToken = require('./githubAccess.json').GITHUB_TOKEN;
var getGitHubFollower = database.getGitHubFollower;
var getGitHubFollowing = database.getGitHubFollowings;

var resolver = require('./data/resolver');
var createPath = resolver.createPath;
var createUserReferenceResponse = resolver.createUserReferenceResponse;
var createUserResponse = resolver.createUserResponse;
var createUserStarResponse = resolver.createUserStarResponse;
var createRepositoryResponse = resolver.createRepositoryResponse;
var createUserDependenciesResponse = resolver.createUserDependenciesResponse;
var createUserRepositoryResponse = resolver.createUserRepositoryResponse;


var app = express();
if (gitHubToken) {
    database.setToken(gitHubToken);
}


var routeTable = new Router.createClass([
    {
        route: 'user[{keys:logins}]',
        get: (pathSet) => createUserReferenceResponse(pathSet)  
    },
    {
      route: 'user[{keys:logins}].follower[{integers:indexes}]',
      get: (pathSet) => createUserDependenciesResponse(pathSet, getGitHubFollower)
    },
    {
      route: 'user[{keys:logins}].following[{integers:indexes}]',
      get: (pathSet) => createUserDependenciesResponse(pathSet, getGitHubFollowing)
    },
    {
        route: 'userByLogin[{keys:logins}]["login"]',
        get: (pathSet) => createUserResponse(pathSet, (user) => user.login)
    },
    {
        route: 'userByLogin[{keys:logins}]["name"]',
        get: (pathSet) => createUserResponse(pathSet, (user) => user.name ? user.name : user.login)
    },
    {
        route: 'userByLogin[{keys:logins}]["imageUrl"]',
        get: (pathSet) => createUserResponse(pathSet, (user) => user.avatar_url)
    },
    {
        route: 'userByLogin[{keys:logins}]["stars"]',
        get: (pathSet) => createUserStarResponse(pathSet)
    },
    { 
        route: 'userByLogin[{keys:logins}].repositories[{integers:indexes}]',
        get: (pathSet) => createUserRepositoryResponse(pathSet)
    },
    {
      route: 'repositoryByIndex[{keys:logins}][{integers:indexes}]["name"]',
      get: (pathSet) => createRepositoryResponse(pathSet, (repository) => repository.name) 
    },
    {
      route: 'repositoryByIndex[{keys:logins}][{integers:indexes}]["stars"]',
      get: (pathSet) => createRepositoryResponse(pathSet, (repository) => repository['stargazers_count'])
    }
]);

app.use(cors());

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }
    console.log('---- New Request -----');
    return new routeTable();
}));

var server = app.listen(3000, (error) => {
    if (error) {
        console.error(error);
    }
});
