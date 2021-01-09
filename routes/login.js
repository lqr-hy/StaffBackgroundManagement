var express = require('express');
var router = express.Router();
const user = require('../sql/user')
router.get('/', (req, res, next) => {
  res.render('login')
})

router.post('/dl', (req, res, next) => {
  // console.log(req.body)
  const obj = req.body
  user.find(obj, (err, data) => {
    if (err) {
      res.send('1')
    }
    console.log(data)
    if (data) {
      req.session.user = 'ok'
      res.send('0')
    }
  })
})

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/user', (req, res, next) => {
  // console.log(req.body)
  const obj = req.body
  user.insertMany(obj, (err, data) => {
    if (err) {
      res.send('1')
    }
    console.log(data)
    if (data) {
      res.send('0')
    }
  })
})
module.exports = router;