"use strict";

//todo: fix this
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const requests = require("./requests");

exports.init = (options) => {
    requests.init(options);
};

exports.clients = require("./clients");
exports.loans = require("./loans");
exports.loanProducts = require("./loan_products");



