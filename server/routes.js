const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/products*", function (req, res)
{
  //split the url of the req to get whichever url the client needs
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${req.url.split('/products')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => res.send(data.data));
});

router.get("/reviews", function (req, res)
{
  //do stuff
})

module.exports = router;