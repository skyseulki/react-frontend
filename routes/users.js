const express = require('express');
const router = express.Router();

const User = require('../models/User')

/* GET users listing. */

router.get('/', async(req, res) => {
  try{
    const getUsers = await User.find({})
    res.json({getUsers})
  }catch(err){
    return err
  }
})



router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch(err){
    res.json({err})
  }
});

// router.get('/:id/restaurants', async(req, res) => {
//   try{
//     const user = await User.findById(req.params.id)
//     res.json({user:restaurants})
//   }catch(err){
//     return err
//   }
// })


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    // to send it back onto postman
    res.json({user})
    // console.log(user)
  } catch(err){
    res.json({err})
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    console.log(updateUser)
    res.json({updateUser})
  } catch(err){
    res.json([err])
  }
});

router.delete('/:id/restaurants/:restId', async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  foundUser.restaurants = foundUser.restaurants.filter(r => {
    return r.id != req.params.restId;
  });
  await foundUser.save();
  res.json({ user: foundUser, deleted: true })
  // try {
  //   const removeRestaurant = await restaurantId.findByIdAndRemove(req.params.id)
  //   const foundUser = await User.findOne({
  //     restaurant: req.params.id
  //   })
  //   await foundUser.restaurants.remove(req.params.id)
  //   await foundUser.save();
  //   res.redirect('/users/:id')
  // } catch(err){
  //   res.json(err)
  // }
});

router.post('/login', async(req, res) => {
  try{
    const foundUser = await User.findOne({ username: req.body.username })
    res.json({
      user: foundUser,
      success: true
      // success: foundUser ? false : true
    })
  } catch(err){
    res.json({err})
  }
})


module.exports = router;
