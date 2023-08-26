axios = require('axios');

const get = (req, res) => {
  axios.get(`${process.env.URL}/products${req.url.split('/products')[1]}`, {headers: {Authorization: `${process.env.REACT_APP_API_KEY}`}})
  .then((data) => res.send(data.data))
  .catch((err) => console.log(err));
}

module.exports = {get};