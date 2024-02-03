//Import Model
const User = require('../models/user.model');
const { revokeGoogleToken, clearOAuthTokens } = require('./oauth.controller'); // Assuming you have these functions in a separate controller

const logoutUser = (req, res) => {
    const userId = req.user._id; // Get the user ID

    // Log session data before logout
    console.log('User Session Data Before Logout:', req.session);

    // Add additional logging to inspect the entire session object
    console.log('Full Session Object:', req.session);

    // Check if user and refreshToken exist in the session
    if (req.user && req.user.refreshToken) {
        console.log('User is logged in and has a refreshToken.');

        // Add more logging to track the execution
        console.log('Initiating token revocation and session clearing...');        

        // Revoke the token
        revokeGoogleToken(req.user.refreshToken);

        // Clear the tokens from the database
        clearOAuthTokens(userId)
            .then(() => {
                // Logout and destroy session
                req.logout((err) => {
                    if (err) {
                        console.error('Error during logout:', err);
                        return res.status(500).send('Server error during logout');
                    }

                    // After successful logout, destroy the session and clear the cookie
                    req.session.destroy(err => {
                        if (err) {
                            console.error('Error destroying session:', err);
                            return res.status(500).send('Server error during logout');
                        }

                        // Clear the session cookie from the client's browser
                        res.clearCookie('connect.sid'); // 'connect.sid' is the default name for the session cookie, but it might be different in your app

                        // Log success and redirect to the home page or send a response
                        console.log('User successfully logged out.');
                        res.redirect('/');
                    });
                });
            })
            .catch((error) => {
                console.error('Error clearing OAuth tokens:', error);
                res.status(500).send('Server error during logout');
            });
    } else {
        // Handle case where no token is found or user is not valid
        console.log('No token found or invalid user during logout.');
        res.status(400).send('No token found or invalid user');
    }
};


function findOrCreateGoogleUser(profile) {
    return User.findOne({ googleId: profile.id }).then(user => {
      if (user) {
        // User exists, return the user
        return user;
      } else {
        // User doesn't exist, create a new user
        const newUser = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          // Set defaults or null for other required fields
          password: null, // You might want to handle this differently
          countryOfOrigin: 'Unknown', // Default value or based on additional info
          dateOfBirth: Date.now(), // Placeholder, adjust as needed
          phone: {
            phoneNumber: 'Unknown', // Default value or based on additional info
            verified: false
          },
          // ... other fields with default or placeholder values ...
        });
        
        return newUser.save();
      }
    }).catch(error => {
      // Handle error
      console.error('Error during user find or creation:', error);
      throw error; // or handle it as you see fit
    });
  }


module.exports = {
    logoutUser,
    findOrCreateGoogleUser,
};