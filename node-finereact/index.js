"use strict";

//node finereact API module

//load wrapper for http request library
const requests = require("./requests");

exports.init = (options) => {
    requests.init(options);
};

exports.clients = require("./clients");
exports.loans = require("./loans");
exports.loanProducts = require("./loan_products");



