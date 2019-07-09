const express = require("express");
const db = require("../../data/dbConfig");
const router = express.Router();

// Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete 
server.delete("/reviews/:id", async (req, res) => {
  try {
    const review = await db("reviews")
      .where({ review_id: req.params.review_id })
      .del();
    if (review) {
      res.status(200).json({
        message: "Review was deleted successfully.", review
      });
    } else {
      res.status(404).json({ message: "The review could not be deleted." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error deleting the review.", error });
  }
});


// Get all // Get all // Get all // Get all // Get all // Get all // Get all // Get all 
server.get("/reviews", async (req, res) => {
  try {
    const reviews = await db("reviews");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the review from the database.",
      error
    });
  }
});

// Get Id  // Get Id  // Get Id  // Get Id  // Get Id  // Get Id  // Get Id  // Get Id  
router.get("/reviews/:id", async (req, res) => {
  try {
    const reviews = await db("reviews").where({ id: req.params.id });
    if (reviews.length) {
      const review = reviews[0];
      res.status(200).json({ ...review});
    } else {
      res
        .status(404)
        .json({ message: "That review could not be found in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the review from the database.",
      error
    });
  }
});

// Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post 
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
          .json({ message: "Review created successfully.", review });
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
