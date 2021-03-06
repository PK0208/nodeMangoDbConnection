//console.log("node server started");
//import express from "express";
const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

//DB Code:

const connectionString =
  "mongodb+srv://user:jg23VHaeqaorh9P2@cluster0.qtlof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    // ... do something here
    if (err) return console.error(err);
    console.log("Connected to Database");

    const db = client.db("hosts-new");
    const usersCollection = db.collection("users");

    app.post("/users", (req, res) => {
      usersCollection
        .insertOne(req.body)
        .then((result) => {
          console.log("postResult", result);
        })
        .catch((error) => console.error(error));
    });
  }
);

// All your handlers here...

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  console.log("In Get method");
  res.sendFile(__dirname + "/index.html");
  //res.send("Hello world");
});

app.post("/quotes", (req, res) => {
  console.log("Request body", req.body);
  console.log("Hellooooooooooooooooo!");
  res.sendFile(__dirname + "/result.html");
});
