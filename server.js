const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config(); // Load environment variables from .env file
require('./db'); // Initializes MongoDB connection
require('./passport-setup'); // Initialize Passport configuration

const app = express();
const PORT = process.env.PORT || 3000;

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    secure: false, // Set to true if your website uses HTTPS
    maxAge: 1000 * 60 * 60 * 24 // Cookie expiry (e.g., 1 day)
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware function to set isLoggedIn
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated() || false;
  next();
});

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');

// Routes
const routes = require('./routes/routes');
app.use('/', routes);

// Google Auth routes
app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account' // Forces account selection every time
  }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Server initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));