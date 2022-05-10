const express = require("express");
let app = express();

// internal module
const { save, getAll } = require("../database");
const { getReposByUsername } = require("../helpers/github");

// middleware
app.use(express.static(__dirname + "/../client/dist"));

// accept json data
app.use(express.json()); // accept json data incoming

app.post("/repos", function (req, res) {
  const username = req.body.username;

  getReposByUsername(username).then(githubRes => {
    save(githubRes.data).then(function () {
      res.sendStatus(200);
    });
  });
});

app.get("/repos", function (req, res) {
  getAll().then(function (data) {
    res.json(data);
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
