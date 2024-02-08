// Import Model
const User = require('../models/user.model');

// Define completeRegistration function
const completeRegistration = async (req, res) => {
    try {
      // Extract form data from request body
      const { countryOfOrigin, yearOfBirth, phoneNumber, optIn, preferredLanguage } = req.body;
  
      // Find the current user by their ID
      const user = await User.findById(req.user._id);
  
      // Update user profile with form data
      user.countryOfOrigin = countryOfOrigin;
      user.yearOfBirth = yearOfBirth;
      user.phone.phoneNumber = phoneNumber;
      user.smsPreferences.optIn = optIn === 'on';
      user.smsPreferences.preferredLanguage = preferredLanguage;
  
      // Save the updated user profile
      await user.save();
  
      // Redirect the user to a success page or any other route as needed
      res.redirect('/');
    } catch (error) {
      console.error('Error completing registration:', error);
      // Handle the error appropriately
      res.status(500).send('Internal Server Error');
    }
};

// Export the completeRegistration function
module.exports = {
    completeRegistration
};