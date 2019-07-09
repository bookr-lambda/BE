require("dotenv").config();

const { authenticate } = require("../auth/authenticate");
// const db = require("../database/dbConfig.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

module.exports = server => {
  server.post("/register", register);
  server.post("/login", login);
};

function register(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Please include a username and password and try again."
    });
  }
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;
  db("users")
    .insert(newUser)
    .then(response => {
      const token = generateToken(newUser);
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
}

async function login(req, res) {
  const creds = req.body;
  const user = await db("users")
    .where({ username: creds.username })
    .first();
  if (user && bcrypt.compareSync(creds.password, user.password)) {
    const token = generateToken(user);
    res
      .status(200)
      .json({ message: "The user was logged in successfully.", token });
  } else {
    res
      .tatus(401)
      .json({ message: "Error. Invalid credentials. Please try again." });
  }
}

