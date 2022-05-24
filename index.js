
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
let bodyParser = require("body-parser");
const { users } = require('./state')

/* BEGIN - create routes here */

app.use(bodyParser.json());

app.get("/users", function (req, res) {
  console.log("GET /users");
  let results = [];
  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      let copy = {};
      copy.id = item.id;
      copy.name = item.name;
      copy.occupation = item.occupation;
      results.push(copy);
  }
  res.json(results);
});

app.get("/users/:id", function (req, res) {
  console.log("/GET/users/", req.params.id)
  let found;
  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      if (item.id == req.params.id) {
          found = item;
          break;
      }
  }
  if (found) {
      res.json(found);
  } else {
      res.sendStatus(404);
  }
});

app.post("/users", function (req, res) {
  console.log("POST /users");
  let json = req.body;
  console.log("body = ", json);
  let newItem = {};
  newItem.id = json.id;
  newItem.name = json.name;
  newItem.occupation = json.occupation;
  newItem.avatar = json.avatar;
  users.push(newItem);


  res.json(newItem);
});

app.put("/users/:id", function (req, res) {
  console.log("PUT /users/", req.params.id);
  let json = req.body;

  let found;
  for (let i = 0; i < users.length; i++) {
      let item = users[id];
      if (item.id == req.params.id) {
          found = item;
          break
      }
  }

  if (found) {
      found.name = json.name;
      found.occupation = json.occupation;
      res.json(found);

  } else {
      res.sendStatus(404);
  }
});

app.delete("/users/:id", function (req, res) {
  console.log("DELETE /users/", req.params.id);
  let index;
  let found;


  for (let i = 0; i < users.length; i++) {
      let item = users[i];
      if (item.id == req.params.id) {
          found = item;
          index = i;
          break;
      }
  }

  if (found) {
      users.splice(index, 1);
  }
  //    res.json(result);
  res.json(found);
});
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))