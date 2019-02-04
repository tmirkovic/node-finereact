//Socket connection events, allows user to call finereact functions

"use strict";

exports = module.exports = (io, finereact) => {
    console.log("loading socket.io");

    io.on("connection", (socket) => {
        console.log("a user connected");


        function setText(data) {
            socket.emit("setText", data);
        }

        socket.on("clientRequest", function(msg) {

            finereact.clients[msg.action](msg.query).then((response) => {
                console.log("finished client action");
                setText(response);
            }).catch((err) => {
                console.log("err:\n", JSON.stringify(err, 0, 4));
                setText(err);
            });


        });

        socket.on("loanRequest", function(msg) {
            console.log("message: " + msg);

            finereact.loans[msg.action](msg.query).then((response) => {
                console.log("finished loan action");
                console.log("response:\n", JSON.stringify(response, 0, 4));
                setText(response);
            }).catch((err) => {
                console.log("err:\n", JSON.stringify(err, 0, 4));
                setText(err);
            });

        });
        socket.on("loanProductRequest", function(msg) {

            finereact.loanProducts[msg.action](msg.query).then((response) => {
                console.log("finished loan product action");
                console.log("response:\n", JSON.stringify(response, 0, 4));
                setText(response);
            }).catch((err) => {
                console.log("err:\n", JSON.stringify(err, 0, 4));
                setText(err);
            });

        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};