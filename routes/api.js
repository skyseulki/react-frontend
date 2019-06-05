const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY)

/* GET home page. */
router.get('/', async (req, res) => {
  client.search({
    term: 'Restaurants',
    location: 'Los Angeles, CA',
  })
  .then(response => {
    const allRestaurants = response.jsonBody.businesses;
    // console.log(response.jsonBody.businesses[0].name);
    res.json({ 
      status: 200,
      data: allRestaurants 
    })
  })
  .catch(err => {
    res.send(err);
  })
});

router.post('/', (req, res) => {
  return res.json({
    body: req.body
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});


module.exports = router;
