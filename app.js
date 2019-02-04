"use strict";

//Simple app demonstrating node-finereact module

const finereact = require("./node-finereact");
const express = require("express");
const path = require("path");


//initialize the module
finereact.init({
    url: "https://13.250.150.80/fineract-provider/api/v1/",
    username: "mifos",
    password: "password",
});



/*finereact.clients.find({
    //sqlSearch: "last_name like %Smith%",
    limit: 1,
    //fields: ["accountNo", "lastname"],

    //tenantIdentifier: "default"
}, {

}).then((response) => {
    console.log("response:\n", JSON.stringify(response, 0, 4));
}).catch((err) => {
    console.log("err:\n", JSON.stringify(err, 0, 4));
});*/




//The hello world of web servers
const app = express();


const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index", {}));

app.use(express.static(path.join(__dirname, "public")));

server.listen(3000, () => {
    console.log("Web server starting");
});

//all the example code is in here
require("./socket")(io, finereact);