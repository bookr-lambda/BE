const express = require("express");
const db = require("../../data/dbConfig");
const router = express.Router();

router.get("/users", async (req, res) => {
    try {
      const users = await db("users");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "There was an error retrieving the users from the database.",
        error
      });
    }
});

router.get("/users/:user_id", async (req, res) => {
    try {
      const users = await db("users").where({ user: req.params.user_id });
      if (reviews.length) {
        const user = users[0];
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: "That user could not be found in the database." });
      }
    } catch (error) {
      res.status(500).json({
        message: "There was an error retrieving the user from the database.",
        error
      });
    }
  });

router.delete("/users/:user_id", async (req, res) => {
    try {
      const user = await db("users")
        .where({ user_id: req.params.user_id })
        .del();
      if (user) {
        res.status(200).json({
          message: "User was deleted successfully.", user
        });
      } else {
        res.status(404).json({ message: "The user could not be deleted." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "There was an error deleting the user.", error });
      console.log(review)
    }
});

module.exports = router;