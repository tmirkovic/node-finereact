"use strict";

//code relating to client functions

const requests = require("./requests");

const CLIENT_PATH = "clients";


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