const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const User = require('./models/User');
const path = require('path');

require('dotenv').config()

require('./db/db')

console.log(process.env.MY_SECRET)

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/restaurants', apiRouter);
app.use('/users', usersRouter);
app.post('/restaurants', async (req, res) => {
  const foundUser = await User.findById(req.body.currentUser._id)
  const restaurant = {
    id: req.body.id,
    name: req.body.name
  }
  foundUser.restaurants.push(restaurant)
  await foundUser.save()
  res.json({
    user: foundUser
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.listen(8080, ()=>{
//   console.log('port:', 8080)
// })

module.exports = app;
