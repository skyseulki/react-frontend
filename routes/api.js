const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY)

/* GET home page. */
router.get('/', async (req, res) => {
  client.search({
    term: `${req.body.term}`,
    location: 'Los Angeles, CA',
    limit: 50
  })
  .then(response => {
    const allRestaurants = response.jsonBody.businesses;
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
  client.search({
    term: `${req.body.term}`,
    location: 'Los Angeles, CA',
    limit: 50
  })
  .then(response => {
    const allRestaurants = response.jsonBody.businesses;
    res.json({ 
      status: 200,
      data: allRestaurants 
    })
  })
  .catch(err => {
    res.send(err);
  })
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});


module.exports = router;
