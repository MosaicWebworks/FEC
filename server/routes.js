const express = require("express");
const router = express.Router();
const axios = require("axios");
const productControllers = require("./productControllers.js");
const reviewsControllers = require("./reviewsControllers.js");
const qaControllers = require("./qaControllers.js");

//Products:
router.get("/products*", productControllers.get);

//Reviews:
router.get("/reviews*", reviewsControllers.get);
router.post("/reviews", reviewsControllers.post);


//Questions and Answers:
router.get("/qa*", qaControllers.get);
router.put("/qa*", qaControllers.put);
router.post("/qa*", qaControllers.post);

module.exports = router;


