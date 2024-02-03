const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Render the index view, passing in any necessary data
  res.render('index', { isLoggedIn: req.isAuthenticated() });
});

module.exports = router;