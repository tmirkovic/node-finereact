"use strict";


const requests = require("./requests");

const CLIENT_PATH = "clients";

/*

offset: Integer optional, defaults to 0 
Indicates the result from which pagination starts

limit: Integer optional, defaults to 200
Restricts the size of results returned. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1

orderBy:String optional, one of displayName, accountNo, officeId, officeName
Orders results by the indicated field.

sortBy: String optional, one of ASC, DESC
indicates what way to order results if orderBy is used.

officeId: Integer optional
Provides the ability to restrict list of clients returned based on the office they are associated with.

underHierarchy: String optional
Use the office hierarchy string to return all clients under a given hierarchy.

displayName: String optional
Use displayName of clients to restrict results.

firstName: String optional
Use firstName of clients to restrict results

lastName: String optional
Use lastName of clients to restrict results.

externalId:String optional
Use externalId of clients to restrict results.

sqlSearch: String optional
Use an sql fragment valid for the underlying client schema to filter results. e.g. display_name like %K%

orphansOnly: Boolean optional, defaults to false
Use orphansOnly as true to list clients which are not associated to any group/parent.
*/

exports.find = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        requests.get({
            path: CLIENT_PATH,
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};

exports.findOne = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        if (typeof queryCopy.id !== "number") { return reject("Invalid client id provided"); }

        let id = queryCopy.id;
        delete queryCopy.id;

        requests.get({
            path: CLIENT_PATH + "/" + id,
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};


/*
Mandatory:
firstname and lastname OR fullname,
officeId,
active=true and activationDate OR active=false,
if(address enabled) address



Optional:
groupId, externalId, accountNo, staffId, mobileNo, savingsProductId, genderId, clientTypeId, clientClassificationId
*/

exports.add = (query) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        if (typeof queryCopy !== "object") { return reject("Invalid options passed in"); }
        if (typeof queryCopy.firstname !== "string") { return reject("Invalid firstname provided"); }
        if (typeof queryCopy.lastname !== "string") { return reject("Invalid lastname provided"); }
        if (typeof queryCopy.officeId !== "number") { return reject("Invalid officeId provided"); }
        if (typeof queryCopy.active !== "boolean") { return reject("Invalid active status provided"); }


        if (queryCopy.active === true && typeof queryCopy.activationDate !== "string") {
            return reject("activationDate must be provided to create active account");
        }

        requests.post({
            path: CLIENT_PATH,
            query: queryCopy,
            useParamters: false,
        }, resolve, reject);
    });
};

exports.template = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);

        requests.get({
            path: CLIENT_PATH + "/template",
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};