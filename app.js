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


//The hello world of web servers
const app = express();

let port = process.env.PORT || 3000;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index", {}));

app.use(express.static(path.join(__dirname, "public")));

server.listen(port, () => {
    console.log("Web server starting");
});

//Host simple page that allows user to call finereact functions
require("./socket")(io, finereact);