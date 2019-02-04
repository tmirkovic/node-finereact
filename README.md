# node-finereact
A node module for interacting with the[ Apache Fineract API](https://demo.openmf.org/api-docs/apiLive.htm)

Installation
============

  Install npm packages
  
    npm install

  To run demo server
  
    npm run demo

Tests
============

  To run tests
  
    npm run test



Using
=====

First import the module

```js
const finereact = require("./node-finereact");
```
Then initialize it

```js
finereact.init({
   url: "https://13.250.150.80/fineract-provider/api/v1/",
   username: "mifos",
   password: "password"
});
```
After initialization you can run commands that interact with the finereact API

```js
finereact.clients.find({}).then((response) => {
    //your code here
});
```
All commands except for initialation will always return a promise


Clients
========


### Adding a new client

| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| firstname | string | "Sarah" | yes | The first name of the client |
| lastname | string | "Smith" | yes | The last name of the client |
| active | boolean | false | yes | Indicates whether this client is to be created as active client. If active=true, then activationDate must be provided. If active=false, then the client is created as pending.| 
| activationDate | string| "04 March 2009" | yes | The date on which the client became active. |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |
| locale | string| "en"| yes | The locale |
| officeId | number| 1| yes | The identifier of the office |

Example:

```js
finereact.clients.add({
    "firstname": "Jane",
    "lastname": "Smith",
    "active": true,
    "officeId": 1,
    "locale": "en",
    "dateFormat": "dd MMMM yyyy",
    "activationDate": "04 March 2009"
}).then((response) => {
    //your code here
});
```



### Querying For Clients


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| offset | number | 0 | no | Indicates the result from which pagination starts |
| limit | string | 200 | no | Restricts the size of results returned. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1 |
| displayName | string | "John Smith" | no | Search for user by name.| 
| fields | array|  ["id", "firstname", "lastname"] | no | Restrict result to certain fields |

Example:

```js
finereact.clients.find({
    "offset": 0,
    "limit": 200,
    "displayName": "John Smith",
    "fields": [
        "id",
        "accountNo",
        "active",
        "firstname",
        "lastname",
        "officeId"
    ]
}).then((response) => {
    //your code here
});
```


### Query Single Client



| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| id | number | 1 | no | The id of the client you are querying |
| fields | array|  ["id", "firstname", "lastname"] | yes | Restrict result to certain fields |

Example:

```js
finereact.clients.findOne({
    "id": 1,
    "fields": [
        "id",
        "accountNo",
        "active",
        "firstname",
        "lastname",
        "officeId"
    ]
}).then((response) => {
    //your code here
});
```


Loans
========


### Submitting a new loan application

| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| clientId | number | 1 | yes | t |
| productId | number | 1 | yes |  |
| principal | string | "10,000.00" | yes | | 
| loanTermFrequency | string| "04 March 2009" | yes |  |
| loanTermFrequencyType | string| 2 | yes | |
| locale | string| "en"| yes | The locale |
| loanType | number| "individual" | yes |  |
| numberOfRepayments | number| "individual" | yes |  |
| repaymentEvery | 1| "individual" | yes | |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |

Example:

```js
finereact.loans.add({
    "clientId": 1,
    "productId": 1,
    "principal": "10,000.00",
    "loanTermFrequency": 12,
    "loanTermFrequencyType": 2,
    "locale": "en",
    "loanType": "individual",
    "numberOfRepayments": 10,
    "repaymentEvery": 1,
    "repaymentFrequencyType": 2,
    "interestRatePerPeriod": 10,
    "amortizationType": 1,
    "interestType": 0,
    "interestCalculationPeriodType": 1,
    "transactionProcessingStrategyId": 1,
    "dateFormat": "dd MMMM yyyy",
    "expectedDisbursementDate": "10 Jun 2013",
    "submittedOnDate": "10 Jun 2013"
}).then((response) => {
    //your code here
});
```



### Querying For Loans


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| offset | number | 0 | no | Indicates the result from which pagination starts |
| limit | string | 200 | no | Restricts the size of results returned. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1 |
| displayName | string | "John Smith" | no | Search for user by name.| 
| fields | array|  ["id", "firstname", "lastname"] | no | Restrict result to certain fields |

Example:

```js
finereact.loans.find({
    "offset": 0,
    "limit": 200
}).then((response) => {
    //your code here
});
```


### Query Single Loan


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| id | number | 1 | yes | The id of the loan you are querying |

Example:

```js
finereact.loans.findOne({
    "id": 1
}).then((response) => {
    //your code here
});
```




### Approve A Loan


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| loanId | number | 1 | yes | The id of the loan you are trying to approve |
| locale | number | "en" | yes | The locale |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |
| expectedDisbursementDate | string| "2 February 2019"| yes | When the loan will be disbursed |
| note | string| "Loan approval note"| no | A note accompaying the approval |


Example:

```js
finereact.loans.approve({
    "loanId": 1,
    "locale": "en",
    "dateFormat": "dd MMMM yyyy",
    "approvedOnDate": "2 February 2019",
    "expectedDisbursementDate": "20 September 2019",
    "note": "Loan approval note"
}).then((response) => {
    //your code here
});
```



### Reject A Loan


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| loanId | number | 1 | yes | The id of the loan you are trying to approve |
| locale | number | "en" | yes | The locale |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |
| rejectedOnDate | string| "2 February 2019"| yes | When the loan was rejected |
| note | string| "Loan rejection note"| no | A noet accompaying the rejection |


Example:

```js
finereact.loans.reject({
    "loanId": 1,
    "locale": "en",
    "dateFormat": "dd MMMM yyyy",
    "rejectedOnDate": "2 February 2019",
    "note": "Loan rejection note"
}).then((response) => {
    //your code here
});

```





### Withdraw A Loan


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| loanId | number | 1 | yes | The id of the loan you are trying to approve |
| locale | number | "en" | yes | The locale |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |
| withdrawnOnDate | string| "2 February 2019"| yes | When the loan was withdrawn |
| note | string| "Loan withdrawl note"| no | A noet accompaying the withdrawl |


Example:

```js
finereact.loans.withdraw({
    "loanId": 1,
    "locale": "en",
    "dateFormat": "dd MMMM yyyy",
    "withdrawnOnDate": "2 February 2019",
    "note": "Reason loan applicant withdrew from application"
}).then((response) => {
    //your code here
});

```






Loan Products
========


### Adding a new loan product

| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| name | string | "Product 1" | yes | The name of the load product |
| shortName | string | "prd1" | yes | Shortened name of the product, 4 characters max |
| currencyCode | string | "USD" | yes |  |
| digitsAfterDecimal | string | "2" | yes |  |
| inMultiplesOf | string | "0" | yes |  |
| principal | string | "5000" | yes |  |
| numberOfRepayments | number | 10 | yes |  |
| repaymentFrequencyType | number | 0 | yes |  |
| amortizationType | number | 1 | yes |  |
| interestType | number | 0 | yes |  |
| interestCalculationPeriodType | number | 01| yes |  |
| transactionProcessingStrategyId | number | 1 | yes |  |
| accountingRule | string | "1" | yes |  |
| isInterestRecalculationEnabled | string | "false" | yes |  |
| daysInMonthType | number | 1 | yes |  |
| daysInYearType | number | 1| yes |  |
| locale | number | "en" | yes | The locale |
| dateFormat | string| "dd MMMM yyyy"| yes | The format of the date |

Example:

```js
finereact.loanProducts.add({
    "name": "Product 1",
    "shortName": "prd1",
    "currencyCode": "USD",
    "digitsAfterDecimal": "2",
    "inMultiplesOf": "0",
    "principal": "5000",
    "numberOfRepayments": 10,
    "repaymentFrequencyType": 0,
    "repaymentEvery": "7",
    "interestRatePerPeriod": "5",
    "interestRateFrequencyType": 2,
    "amortizationType": 1,
    "interestType": 0,
    "interestCalculationPeriodType": 1,
    "transactionProcessingStrategyId": 1,
    "accountingRule": "1",
    "isInterestRecalculationEnabled": "false",
    "daysInMonthType": 1,
    "daysInYearType": 1,
    "dateFormat": "dd MMMM yyyy",
    "locale": "en"
}).then((response) => {
    //your code here
});
```



### Querying For loan products


| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| offset | number | 0 | no | Indicates the result from which pagination starts |
| limit | string | 200 | no | Restricts the size of results returned. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1 |

Example:

```js
finereact.loanProducts.find({
    "offset": 0,
    "limit": 200
}).then((response) => {
    //your code here
});
```


### Query Single Loan Product



| Name | Type |	Example | Required |	Description |
| ---- |:----:|:-------:|:-------:|:----------- |
| id | number | 1 | no | The id of the loan product you are querying |

Example:

```js
finereact.loanProducts.findOne({
    "id": 1
}).then((response) => {
    //your code here
});
```




