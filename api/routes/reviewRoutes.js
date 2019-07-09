const express = require("express");
const db = require("../../data/dbConfig");
const router = express.Router();

router.post("/reviews", async (req, res) => {
    if (!req.body.review) {
      return res.status(400).json({
        message:
          "Please include a review and try again."
      });
    }
    try {
      const review = await db("reviews").insert(req.body);
      if (review) {
        res
          .status(200)
          .json({ message: "review created successfully.", review });
      } else {
        res
          .status(404)
          .json({ message: "The review could not be added to the database." });
      }
    } catch (error) {
      res.status(500).json({
        message: "There was an error adding the review to the database.",
        error
      });
    }
  });