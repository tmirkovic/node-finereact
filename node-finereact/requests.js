"use strict";
//wrapper around request library

const request = require("request");

//request.debug = true;

let url = null;

const auth = {
    user: null,
    pass: null,
    sendImmediately: true
};


//needs to be called before anything else
exports.init = (options) => {
    if (typeof options !== "object") { return Error("no options passed to init"); }
    if (typeof options.username !== "string") { return Error("no username passed in"); }
    if (typeof options.password !== "string") { return Error("no password passed in"); }
    if (typeof options.url !== "string" || options.url.length < 1) { return Error("no url passed in"); }

    auth.user = options.username;
    auth.pass = options.password;
    url = options.url;
};


exports.get = (options, resolve, reject) => {

    makeRequest("GET", options, resolve, reject);
};


exports.post = (options, resolve, reject) => {

    makeRequest("POST", options, resolve, reject);
};

exports.put = (options, resolve, reject) => {

    makeRequest("PUT", options, resolve, reject);
};

exports.delete = (options, resolve, reject) => {

    makeRequest("DELETE", options, resolve, reject);
};


function makeRequest(requestType, options = {}, resolve, reject) {

    if (url === null) {
        return reject("Connection has not been initialized. Call .init() first");
    }
    if (typeof requestType !== "string") {
        return reject("Invalid requestType");
    }

    let operation = requestType.toLowerCase();

    if (operation !== "get" && operation !== "put" &&
        operation !== "post" && operation !== "delete") {
        return reject("request must be get, post, put, or delete");
    }

    const requestOptions = {
        url: options.path,
        baseUrl: url,
        auth: auth,
        headers: {
            "Fineract-Platform-TenantId": "default",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
    };



    if (options.useParamters === true) {
        //console.log("options.query:\n", JSON.stringify(options.query, 0, 4));
        let query = options.query;

        for (const key in query) {
            let value = query[key];
            if (query.hasOwnProperty(key) && Array.isArray(value)) {
                //finreact wants array items comma separated
                query[key] = value.join(",");
            }
        }
        requestOptions.qs = query;
    } else if (options.query) {
        requestOptions.body = JSON.stringify(options.query);
        //console.log("options.query:\n", JSON.stringify(options.query, 0, 4));
    }

    request[operation](requestOptions, (err, res, body) => {
        if (err) {
            return reject(err);
        }

        let data = JSON.parse(body);

        //if we successfully got back a negative response, we still reject
        if (data.httpStatusCode && data.httpStatusCode !== "200") {
            return reject(data);
        }

        if (data.error) {
            return reject(data);
        }

        return resolve(data);
    });

}