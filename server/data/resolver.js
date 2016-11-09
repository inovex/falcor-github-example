var $ref = require('falcor-json-graph').ref;

var database = require('github-lib');
var getGitHubUser = database.getGitHubUser;
var getGitHubRepository = database.getGitHubRepositories;


function createPath(pathSet, value) {
    return {path: pathSet, 'value': value};
}

function createUserReferenceResponse(pathSet) {
    let response = [];
    pathSet.logins.forEach(login => {
        response.push(createPath([pathSet[0], login], $ref(['userByLogin', login])));
    });
    return response;
}

function createUserResponse(pathSet, valueFunction) {
    let response = [];
    let promiseList = [];
    pathSet.logins.forEach((login) => {
        promiseList.push(getGitHubUser(login)
            .then(user => response.push(createPath([pathSet[0], user.login, pathSet[2]], valueFunction(user)))))
    });
    return Promise.all(promiseList)
        .then(() => response);
}

function createUserStarResponse(pathSet) {
    let response = [];
    let promiseList = [];
    pathSet.logins.forEach(login => {
        promiseList.push(getGitHubRepository(login)
        .then(repositories => {
            var stars = repositories.reduce((total, repository) => total + repository['stargazers_count'], 0);
            response.push(createPath([pathSet[0], login, pathSet[2]], stars));
        })) 
    });
    return Promise.all(promiseList)
        .then(() => response);
}

function createRepositoryResponse(pathSet, valueFunction) {
    let response = [];
    let promiseList = [];
    pathSet.logins.forEach(login => {
        promiseList.push(getGitHubRepository(login)
        .then(repositories => {
            pathSet.indexes.forEach(index => {
                if (index < repositories.length) {
                    response.push(createPath([pathSet[0], login, index, pathSet[3]], valueFunction(repositories[index])));
                }
            })
        }))
    })
    return Promise.all(promiseList)
        .then(() => response);
}

function createUserDependenciesResponse(pathSet, backendCall) {
    let response = [];
    let promiseList = [];
    pathSet.logins.forEach(login => {
        promiseList.push(backendCall(login)
        .then(dependency => {
            pathSet.indexes.forEach(index => {
                if (index < dependency.length) {
                    response.push(createPath([pathSet[0], login, pathSet[2], index], $ref(['userByLogin', dependency[index].login])));
                }
            });
        }))
    });
    return Promise.all(promiseList)
    .then(() => response);
}

function createUserRepositoryResponse(pathSet) {
    let response = [];
    let promiseList = [];
    pathSet.logins.forEach(login => {
        promiseList.push(getGitHubRepository(login)
            .then(repositories => {
                pathSet.indexes.forEach(index => {
                    if (index < repositories.length) {
                        response.push(createPath([pathSet[0], login, pathSet[2], index], $ref(['repositoryByIndex', login, index])));
                    }    
                });
            }));
    });
    return Promise.all(promiseList)
        .then(() => response);
}


module.exports = {
    createPath: createPath,
    createUserReferenceResponse: createUserReferenceResponse,
    createUserResponse: createUserResponse,
    createUserStarResponse: createUserStarResponse,
    createRepositoryResponse: createRepositoryResponse,
    createUserDependenciesResponse: createUserDependenciesResponse,
    createUserRepositoryResponse: createUserRepositoryResponse
};
