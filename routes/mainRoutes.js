const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;

  res.render('index', { isLoggedIn: isLoggedIn, title: 'Home Page', message: 'Welcome to my website!' });
});

module.exports = router;