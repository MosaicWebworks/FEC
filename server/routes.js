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

router.get("/qa*", function (req, res)
{
  //split the url of the req to get whichever url the client needs
  console.log('req is:', req.url);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa${req.url.split('/qa')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => {
    res.send(data.data)
  })
  .catch((err) => console.log(err));
});

router.put("/qa*", (req, res) => {
  // console.log('req url:', req.url.split('/qa')[1]);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/5992814/helpful`, {}, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}} )
    .then(() => {

      res.sendStatus(204);
    })
    .catch((err) => res.sendStatus(401));
})

module.exports = router;


