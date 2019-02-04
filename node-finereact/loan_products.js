"use strict";

//code relating to loan product functions

const requests = require("./requests");

const LOAN_PRODUCT_PATH = "loanproducts";

exports.find = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        requests.get({
            path: LOAN_PRODUCT_PATH,
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};

exports.findOne = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);

        if (typeof queryCopy.id !== "number") { return reject("Invalid loan product id provided"); }
        let id = queryCopy.id;
        delete queryCopy.id;

        requests.get({
            path: LOAN_PRODUCT_PATH + "/" + id,
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};


exports.add = (query) => {
    return new Promise((resolve, reject) => {
        if (typeof query !== "object") { return reject("Invalid options passed in"); }
        if (typeof query.name !== "string") { return reject("Invalid name provided"); }
        if (typeof query.shortName !== "string") { return reject("Invalid shortName provided"); }
        if (typeof query.currencyCode !== "string") { return reject("Invalid currencyCode provided"); }


        let queryCopy = Object.assign({}, query);

        requests.post({
            path: LOAN_PRODUCT_PATH,
            query: queryCopy,
            useParamters: false,
        }, resolve, reject);
    });
};

exports.template = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);

        requests.get({
            path: LOAN_PRODUCT_PATH + "/template",
            query: queryCopy,
            useParamters: true,
        }, resolve, reject);
    });
};