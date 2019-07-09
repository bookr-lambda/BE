require("dotenv").config();

// const { authenticate } = require("../auth/authenticate");
const express = require("express");
const db = require("../../data/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

function generateToken(user) {
  const payload = {
    username: user.id,
    name: user.username
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

router.post("/register",async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Please include a username and password and try again."
    });
  }
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;
  await db("users")
    .insert(newUser)
    .then(response => {
      const token = generateToken(newUser);
      console.log(response,"-----> this is a response")
      res
        .status(200)
        .json({
          message: "New account created successfully.",
          response,
          token
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error creating the new account",
        error
      });
    });
});

router.post("/login", async (req, res) => {
  const credentials = req.body;
  const user = await db("users")
    .where({ username: credentials.username })
    .first();
  if (user && bcrypt.compareSync(credentials.password, user.password)) {
    const token = generateToken(user);
    res
      .status(200)
      .json({ message: "The user was logged in successfully.", token });
  } else {
    res
      .status(401)
      .json({ message: "Error. Invalid credentials. Please try again." });
  }
});

module.exports = router;