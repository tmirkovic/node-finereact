/* global io, JSONEditor, $ */
"use strict";

//simple demo where you press a button to trigger socket events
// to demonstrate finereact module

const socket = io();

function setGui() {

    if (mode !== "loan" &&
        (action === "withdraw" || action === "reject" || action === "approve")) {
        action = "add";
        $(".actionButton").removeClass("active");
        $(".actionButton[action='add']").addClass("active");
    }

    editor.set(presets[mode][action]);

    //update sample code
    setCodeView();

    //make sure nothing in the tree is collapsed
    editor.expandAll();

    //hide appropriate buttons
    if (mode === "loan") {
        $(".loanActions").removeClass("hidden");
    } else {
        $(".loanActions").addClass("hidden");
    }
}




function setCodeView() {
    let data = editor.get();

    let queryHtml = "";

    if (data !== null) {
        queryHtml = JSON.stringify(data, 0, 4);
    }

    let codeHtml = "finereact." + mode + "s." + action + "(" + queryHtml + ").then((response) => {" +
        "\n    //your code here" +
        "\n});";

    $("#codeArea").html(codeHtml);
}

function getDataFromEditor() {
    presets[mode][action] = editor.get();
}


let mode = "client";
let action = "add";

let presets = {
    client: {
        add: {
            firstname: "Jane",
            lastname: "Smith",
            active: true,
            officeId: 1,
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            activationDate: "04 March 2009",
        },
        find: {
            offset: 0,
            limit: 200,
            displayName: "John Smith",
            fields: ["id", "accountNo", "active", "firstname", "lastname", "officeId"]
        },
        findOne: {
            id: 1,
            fields: ["id", "accountNo", "active", "firstname", "lastname", "officeId"]
        },
        template: null
    },
    loan: {
        add: {
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

        },
        find: {
            offset: 0,
            limit: 200
        },
        findOne: {
            id: 1,
        },
        template: {
            clientId: 1,
            templateType: "individual"
        },
        approve: {
            loanId: 1,
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            approvedOnDate: "2 February 2019",
            expectedDisbursementDate: "20 September 2019",
            note: "Loan approval note"
        },
        reject: {
            loanId: 1,
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            rejectedOnDate: "2 February 2019",
            note: "Loan rejection note"
        },
        withdraw: {
            loanId: 1,
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            withdrawnOnDate: "2 February 2019",
            note: "Reason loan applicant withdrew from application"
        }
    },
    loanProduct: {
        add: {
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
        },
        find: {
            offset: 0,
            limit: 200,
        },
        findOne: {
            id: 1,
        },
        template: null,

    }
};



//create json editor GUI 
let container = document.getElementById("jsoneditor");
let options = {
    mainMenuBar: true,
    navigationBar: false,
    search: false,
    collapse: false,
    sortObjectKeys: false,
    enableSort: false,
    enableTransform: false,
    onChange: setCodeView,
    name: "parameters"
};
let editor = new JSONEditor(container, options);

//set initial GUI
setGui();


//event listeners
$(".modeButton").click(function() {
    $(".modeButton").removeClass("active");
    $(this).addClass("active");
    getDataFromEditor();
    mode = $(this).attr("mode");
    setGui();
});

$(".actionButton").click(function() {
    $(".actionButton").removeClass("active");
    $(this).addClass("active");
    getDataFromEditor();
    action = $(this).attr("action");
    setGui();
});

$("#sendButton").click(function() {
    socket.emit(mode + "Request", {
        query: editor.get(),
        action: action
    });
});

//display server response in GUI
socket.on("setText", (data) => {
    $("#displayArea").html(JSON.stringify(data, 0, 4));
});