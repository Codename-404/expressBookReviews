const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const payload = req.body;
  const username = payload.username;
  const password = payload.password;
  if (!username) {
    return res.status(400).json({ message: "Invalid username" });
  }
  if (!password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  if (users[username]) {
    return res.status(401).json({ message: "User already exists" });
  }

  users[username] = password;
  return res.status(200).json({ message: "Successfully registered user" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here

  return res.status(300).json({ books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const tempAuthor = req.params.author;
  const allVals = Object.values(books);
  const result = [];
  for (let i = 0; i < allVals.length; i++) {
    if (allVals[i].author === tempAuthor) {
      result.push(allVals[i]);
    }
  }
  //Write your code here
  return res.status(300).json({ booksByAuthor: result });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const tempTitle = req.params.title;
  const allVals = Object.values(books);
  const result = [];
  for (let i = 0; i < allVals.length; i++) {
    if (allVals[i].title === tempTitle) {
      result.push(allVals[i]);
    }
  }

  return res.status(300).json({ booksByTitle: result });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ bookReviews: books[req.params.isbn].reviews });
});

module.exports.general = public_users;
