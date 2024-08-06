const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = {};

const isValid = (username) => {
  //returns boolean
  return !!username;
};

const authenticatedUser = (username, password) => {
  return users[username] === password;
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  console.log("coming session", req.session);
  const payload = req.body;
  const username = payload.username;
  const password = payload.password;
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ data: users });
  }

  try {
    const token = jwt.sign({ username }, "fingerprint_customer");

    req.session.token = token;
    console.log("set session", req.session);
    return res.status(200).json({ message: "Successfully logged in" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.query.review;

  books[req.params.isbn].reviews[req.username] = review;
  return res.status(200).json({ message: "Successfully updated review" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.username;

  delete books[req.params.isbn].reviews[username];
  return res.status(200).json({ message: "Successfully deleted review" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
