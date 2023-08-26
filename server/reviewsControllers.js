axios = require('axios');

const get = (req, res) => {
  //split the url of the req to get whichever url the client needs
  axios.get(`${process.env.URL}/reviews${req.url.split('/reviews')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => res.send(data.data))
  .catch((err) => console.log(err));
}

const post = (req, res) => {
  console.log('Received data:', req.body);
  axios.post(`${process.env.URL}/reviews`, req.body, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
    .then((data) => res.send(data.data))
    .catch((err) => console.log(err));
}

module.exports = {get, post};