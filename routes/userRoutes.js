const express = require('express');
const router = express.Router();

router.get('/myAccount', (req, res) => {
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
  
    res.render('dashboard', { isLoggedIn: isLoggedIn, title: 'User Dashboard', message: 'Welcome to the user dashboard!' });
  });

module.exports = router;