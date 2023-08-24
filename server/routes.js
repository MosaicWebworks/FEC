const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/products*", function (req, res)
{
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${req.url.split('/products')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => res.send(data.data))
  .catch((err) => console.log(err));
});

router.get("/reviews*", function (req, res)
{
  //split the url of the req to get whichever url the client needs
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews${req.url.split('/reviews')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => res.send(data.data))
  .catch((err) => console.log(err));
});

router.post("/reviews", function (req, res) {
  console.log('Received data:', req.body);
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, req.body, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
    .then((data) => res.send(data.data))
    .catch((err) => console.log(err));
});

router.get("/qa*", function (req, res)
{
  //split the url of the req to get whichever url the client needs
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa${req.url.split('/qa')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => {
    res.send(data.data)
  })
  .catch((err) => console.log(err));
});

router.put("/qa*", (req, res) => {

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa${req.url.split('/qa')[1]}`, {}, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}} )
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
})

router.post("/qa*", (req, res) => {
  console.log('reqbody', req.body);

  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa${req.url.split('/qa')[1]}`, req.body , {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}} )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
})

module.exports = router;


