"use strict";


const requests = require("./requests");

const LOAN_PATH = "loans";

exports.find = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);

        requests.get({
            path: LOAN_PATH,
            query: queryCopy,
            useParameters: true,
        }, resolve, reject);
    });
};


exports.findOne = (query = {}) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        if (typeof queryCopy.id !== "number") { return reject("loan id not provided"); }

        let id = queryCopy.id;
        delete queryCopy.id;

        requests.get({
            path: LOAN_PATH + "/" + id,
            query: queryCopy,
            useParameters: true,
        }, resolve, reject);
    });
};


exports.add = (query) => {
    return new Promise((resolve, reject) => {
        if (typeof query !== "object") { return reject("Invalid options passed in"); }
        if (typeof query.clientId !== "number") { return reject("Invalid clientId passed in"); }
        if (typeof query.productId !== "number") { return reject("Invalid productId passed in"); }
        if (typeof query.principal !== "string") { return reject("Invalid principal passed in"); }
        if (typeof query.loanTermFrequency !== "number") { return reject("Invalid loanTermFrequency passed in"); }
        if (typeof query.numberOfRepayments !== "number") { return reject("Invalid numberOfRepayments passed in"); }

        let queryCopy = Object.assign({}, query);

        requests.post({
            path: LOAN_PATH,
            query: queryCopy,
            useParameters: false,
        }, resolve, reject);
    });
};

exports.template = (query) => {
    return new Promise((resolve, reject) => {
        let queryCopy = Object.assign({}, query);
        if (typeof queryCopy !== "object") { return reject("Invalid options passed in"); }
        if (typeof queryCopy.clientId !== "number") { return reject("Invalid clientId passed in"); }
        if (typeof queryCopy.templateType !== "string") { return reject("Invalid templateType passed in"); }


        requests.get({
            path: LOAN_PATH + "/template",
            query: queryCopy,
            useParameters: true,
        }, resolve, reject);
    });
};

exports.approve = (query) => {
    return new Promise((resolve, reject) => {
        if (typeof query !== "object") { return reject("Invalid options passed in"); }
        if (typeof query.loanId !== "number") { return reject("Invalid loanId passed in"); }
        if (typeof query.approvedOnDate !== "string") { return reject("Invalid approvedOnDate passed in"); }

        let queryCopy = Object.assign({}, query);
        let id = queryCopy.loanId;
        delete queryCopy.loanId;

        requests.post({
            path: LOAN_PATH + "/" + id + "?command=approve",
            query: queryCopy,
            useParameters: false,
        }, resolve, reject);
    });
};


exports.reject = (query) => {
    return new Promise((resolve, reject) => {
        if (typeof query !== "object") { return reject("Invalid options passed in"); }
        if (typeof query.loanId !== "number") { return reject("Invalid loanId passed in"); }
        if (typeof query.rejectedOnDate !== "string") { return reject("Invalid rejectedOnDate passed in"); }

        let queryCopy = Object.assign({}, query);
        let id = queryCopy.loanId;
        delete queryCopy.loanId;

        requests.post({
            path: LOAN_PATH + "/" + id + "?command=reject",
            query: queryCopy,
            useParameters: false,
        }, resolve, reject);
    });
};

exports.withdraw = (query) => {
    return new Promise((resolve, reject) => {
        if (typeof query !== "object") { return reject("Invalid options passed in"); }
        if (typeof query.loanId !== "number") { return reject("Invalid loanId passed in"); }
        if (typeof query.withdrawnOnDate !== "string") { return reject("Invalid withdrawnOnDate passed in"); }

        let queryCopy = Object.assign({}, query);
        let id = queryCopy.loanId;
        delete queryCopy.loanId;

        requests.post({
            path: LOAN_PATH + "/" + id + "?command=withdrawnByApplicant",
            query: queryCopy,
            useParameters: false,
        }, resolve, reject);
    });
};