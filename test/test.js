"use strict";

const assert = require("assert");
const nock = require("nock");
const finereact = require("../node-finereact");

const chai = require("chai").use(require("chai-as-promised"));
const should = chai.should();


const HOSTNAME = "https://13.250.150.80";
const API_PATH = "/fineract-provider/api/v1/";

const URL = HOSTNAME + API_PATH;



describe("finereact", function() {

    describe("initialization", function() {

        it("Fails when trying to complete an action before initialization", (done) => {
            finereact.clients.find({}).then((response) => {}).catch((err) => {
                assert(err);
                done();
            });


        });


        it("Fails initialization without url", function(done) {
            try {
                finereact.init({
                    username: "mifos",
                    password: "password",
                });
                assert(false);
            } catch (err) {
                assert(true);
            }

            done();

        });

        it("Fails initialization without username", function(done) {
            try {
                finereact.init({
                    url: URL,
                    password: "password",
                });
                assert(false);
            } catch (err) {
                assert(true);
            }

            done();

        });

        it("Fails initialization without password", function(done) {
            try {
                finereact.init({
                    username: "mifos",
                    password: "password",
                });
                assert(false);
            } catch (err) {
                assert(true);
            }

            done();

        });


        it("Initializes without error, when passed proper parameters", function(done) {
            finereact.init({
                url: URL,
                username: "mifos",
                password: "password",
            });

            assert(true);
            done();
        });


    });


    describe("client route", function() {


        describe("add client", function() {


            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails when firstname not provided", function(done) {

                finereact.clients.add({
                    lastname: "Smith",
                    active: true,
                    officeId: 1,
                    locale: "en",
                    dateFormat: "dd MMMM yyyy",
                    activationDate: "04 March 2009",
                }).should.be.rejected.and.notify(done);

            });


            it("fails when lastname not provided", function(done) {

                finereact.clients.add({
                    firstname: "John",
                    active: true,
                    officeId: 1,
                    locale: "en",
                    dateFormat: "dd MMMM yyyy",
                    activationDate: "04 March 2009",
                }).should.be.rejected.and.notify(done);
            });

            it("fails when officeId not provided", function(done) {

                finereact.clients.add({
                    firstname: "John",
                    lastname: "Smith",
                    active: true,
                    locale: "en",
                    dateFormat: "dd MMMM yyyy",
                    activationDate: "04 March 2009",
                }).should.be.rejected.and.notify(done);
            });

            it("fails when active boolean not provided", function(done) {

                finereact.clients.add({
                    firstname: "John",
                    lastname: "Smith",
                    locale: "en",
                    officeId: 1,
                    dateFormat: "dd MMMM yyyy",
                    activationDate: "04 March 2009",
                }).should.be.rejected.and.notify(done);
            });

            it("succeeds when all required parameters provided", function(done) {

                finereact.clients.add({
                    firstname: "John",
                    lastname: "Smith",
                    locale: "en",
                    officeId: 1,
                    dateFormat: "dd MMMM yyyy",
                    active: true,
                    activationDate: "04 March 2009",
                }).should.be.fulfilled.and.notify(done);
            });
        });

        describe("find client", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("succeeds with empty object", function(done) {
                finereact.clients.find({}).should.be.fulfilled.and.notify(done);
            });

            it("succeeds with no options object", function(done) {
                finereact.clients.find().should.be.fulfilled.and.notify(done);
            });

        });


        describe("findOne client", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.clients.findOne({}).should.be.rejected.and.notify(done);
            });

            it("fails with nothing passed in", function(done) {
                finereact.clients.findOne().should.be.rejected.and.notify(done);
            });

            it("succeeds with id specified", function(done) {
                finereact.clients.findOne({ id: 1 }).should.be.fulfilled.and.notify(done);
            });

        });



    });



    describe("loan route", function() {


        describe("add loan", function() {

            let loanQueryOptions = {
                clientId: 1,
                productId: 1,
                principal: "10,000.00",
                loanTermFrequency: 12,
                loanTermFrequencyType: 2,
                locale: "en",
                loanType: "individual",
                numberOfRepayments: 10,
                repaymentEvery: 1,
                repaymentFrequencyType: 2,
                interestRatePerPeriod: 10,
                amortizationType: 1,
                interestType: 0,
                interestCalculationPeriodType: 1,
                transactionProcessingStrategyId: 1,
                dateFormat: "dd MMMM yyyy",
                expectedDisbursementDate: "10 Jun 2013",
                submittedOnDate: "10 Jun 2013",
            };

            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loans.add({}).should.be.rejected.and.notify(done);
            });

            it("fails with no options object", function(done) {
                finereact.loans.add().should.be.rejected.and.notify(done);
            });

            it("fails when clientId not provided", function(done) {
                let query = Object.assign({}, loanQueryOptions);
                delete query.clientId;
                finereact.loans.add(query).should.be.rejected.and.notify(done);
            });

            it("fails when productId not provided", function(done) {
                let query = Object.assign({}, loanQueryOptions);
                delete query.productId;
                finereact.loans.add(query).should.be.rejected.and.notify(done);
            });

            it("fails when principal not provided", function(done) {
                let query = Object.assign({}, loanQueryOptions);
                delete query.principal;
                finereact.loans.add(query).should.be.rejected.and.notify(done);
            });

            it("fails when loanTermFrequency not provided", function(done) {
                let query = Object.assign({}, loanQueryOptions);
                delete query.loanTermFrequency;
                finereact.loans.add(query).should.be.rejected.and.notify(done);
            });

            it("fails when numberOfRepayments not provided", function(done) {
                let query = Object.assign({}, loanQueryOptions);
                delete query.numberOfRepayments;
                finereact.loans.add(query).should.be.rejected.and.notify(done);
            });


            it("succeeds when all required parameters provided", function(done) {
                finereact.loans.add(loanQueryOptions).should.be.fulfilled.and.notify(done);
            });
        });

        describe("find loans", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("succeeds with empty object", function(done) {
                finereact.loans.find({}).should.be.fulfilled.and.notify(done);
            });

            it("succeeds with no options object", function(done) {
                finereact.loans.find().should.be.fulfilled.and.notify(done);
            });

        });


        describe("findOne loan", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loans.findOne({}).should.be.rejected.and.notify(done);
            });

            it("fails with nothing passed in", function(done) {
                finereact.loans.findOne().should.be.rejected.and.notify(done);
            });

            it("succeeds with id specified", function(done) {
                finereact.loans.findOne({ id: 1 }).should.be.fulfilled.and.notify(done);
            });

        });

        describe("approve loan", function() {

            let loanApprovalOptions = {
                loanId: 1,
                locale: "en",
                dateFormat: "dd MMMM yyyy",
                approvedOnDate: "2 February 2019",
                expectedDisbursementDate: "20 September 2019",
                note: "Loan approval note"
            };

            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loans.approve({}).should.be.rejected.and.notify(done);
            });

            it("fails with no options object", function(done) {
                finereact.loans.approve().should.be.rejected.and.notify(done);
            });

            it("fails when loanId not provided", function(done) {
                let query = Object.assign({}, loanApprovalOptions);
                delete query.loanId;
                finereact.loans.approve(query).should.be.rejected.and.notify(done);
            });

            it("fails when approvedOnDate not provided", function(done) {
                let query = Object.assign({}, loanApprovalOptions);
                delete query.approvedOnDate;
                finereact.loans.approve(query).should.be.rejected.and.notify(done);
            });

            it("succeeds when all required parameters provided", function(done) {
                finereact.loans.approve(loanApprovalOptions).should.be.fulfilled.and.notify(done);
            });
        });

        describe("reject loan", function() {

            let loanRejectionOptions = {
                loanId: 1,
                locale: "en",
                dateFormat: "dd MMMM yyyy",
                rejectedOnDate: "2 February 2019",
                note: "Loan rejection note"
            };

            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loans.reject({}).should.be.rejected.and.notify(done);
            });

            it("fails with no options object", function(done) {
                finereact.loans.reject().should.be.rejected.and.notify(done);
            });

            it("fails when loanId not provided", function(done) {
                let query = Object.assign({}, loanRejectionOptions);
                delete query.loanId;
                finereact.loans.reject(query).should.be.rejected.and.notify(done);
            });

            it("fails when rejectedOnDate not provided", function(done) {
                let query = Object.assign({}, loanRejectionOptions);
                delete query.rejectedOnDate;
                finereact.loans.reject(query).should.be.rejected.and.notify(done);
            });

            it("succeeds when all required parameters provided", function(done) {
                finereact.loans.reject(loanRejectionOptions).should.be.fulfilled.and.notify(done);
            });
        });



        describe("withdraw loan", function() {

            let loanWithdrawOptions = {
                loanId: 1,
                locale: "en",
                dateFormat: "dd MMMM yyyy",
                withdrawnOnDate: "2 February 2019",
                note: "Reason loan applicant withdrew from application"
            };

            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loans.withdraw({}).should.be.rejected.and.notify(done);
            });

            it("fails with no options object", function(done) {
                finereact.loans.withdraw().should.be.rejected.and.notify(done);
            });

            it("fails when loanId not provided", function(done) {
                let query = Object.assign({}, loanWithdrawOptions);
                delete query.loanId;
                finereact.loans.withdraw(query).should.be.rejected.and.notify(done);
            });

            it("fails when withdrawnOnDate not provided", function(done) {
                let query = Object.assign({}, loanWithdrawOptions);
                delete query.withdrawnOnDate;
                finereact.loans.withdraw(query).should.be.rejected.and.notify(done);
            });

            it("succeeds when all required parameters provided", function(done) {
                finereact.loans.withdraw(loanWithdrawOptions).should.be.fulfilled.and.notify(done);
            });
        });
    });

    describe("loan product route", function() {


        describe("add loan product", function() {


            let addLoanProductOptions = {
                name: "Product 1",
                shortName: "prd1",
                currencyCode: "USD",
                digitsAfterDecimal: "2",
                inMultiplesOf: "0",
                principal: "5000",
                numberOfRepayments: 10,
                repaymentFrequencyType: 0,
                repaymentEvery: "7",
                interestRatePerPeriod: "5",
                interestRateFrequencyType: 2,
                amortizationType: 1,
                interestType: 0,
                interestCalculationPeriodType: 1,
                transactionProcessingStrategyId: 1,
                accountingRule: "1",
                isInterestRecalculationEnabled: "false",
                daysInMonthType: 1,
                daysInYearType: 1,
                dateFormat: "dd MMMM yyyy",
                locale: "en",
            };

            beforeEach(() => {
                nock(URL)
                    .post(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails when name not provided", function(done) {
                let query = Object.assign({}, addLoanProductOptions);
                delete query.name;
                finereact.loanProducts.add(query).should.be.rejected.and.notify(done);
            });

            it("fails when shortName not provided", function(done) {
                let query = Object.assign({}, addLoanProductOptions);
                delete query.shortName;
                finereact.loanProducts.add(query).should.be.rejected.and.notify(done);
            });
            it("fails when currencyCode not provided", function(done) {
                let query = Object.assign({}, addLoanProductOptions);
                delete query.currencyCode;
                finereact.loanProducts.add(query).should.be.rejected.and.notify(done);
            });

            it("succeeds when all required parameters provided", function(done) {
                finereact.loanProducts.add(addLoanProductOptions).should.be.fulfilled.and.notify(done);
            });
        });

        describe("find loan product", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("succeeds with empty object", function(done) {
                finereact.loanProducts.find({}).should.be.fulfilled.and.notify(done);
            });

            it("succeeds with no options object", function(done) {
                finereact.loanProducts.find().should.be.fulfilled.and.notify(done);
            });

        });


        describe("findOne loan product", function() {

            beforeEach(() => {
                nock(URL)
                    .get(function(url) {
                        return true;

                    })
                    .reply(200, { sucess: "true" });

            });

            it("fails with empty object", function(done) {
                finereact.loanProducts.findOne({}).should.be.rejected.and.notify(done);
            });

            it("fails with nothing passed in", function(done) {
                finereact.loanProducts.findOne().should.be.rejected.and.notify(done);
            });

            it("succeeds with id specified", function(done) {
                finereact.loanProducts.findOne({ id: 1 }).should.be.fulfilled.and.notify(done);
            });

        });



    });


});