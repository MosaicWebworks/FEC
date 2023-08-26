axios = require('axios');

const get = (req, res) => {
  //split the url of the req to get whichever url the client needs
  axios.get(`${process.env.URL}/qa${req.url.split('/qa')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => {
    res.send(data.data)
  })
  .catch((err) => console.log(err));
}

const put = (req, res) => {

  axios.put(`${process.env.URL}/qa${req.url.split('/qa')[1]}`, {}, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}} )
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
}

const post = (req, res) => {
  console.log('reqbody', req.body);

  axios.post(`${process.env.URL}/qa${req.url.split('/qa')[1]}`, req.body , {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}} )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
}

module.exports = {get, put, post};