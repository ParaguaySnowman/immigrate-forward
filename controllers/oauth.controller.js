// Import necessary modules (if not already imported)
const fetch = require('node-fetch'); // You may need to install this module using npm or yarn

// Function to revoke Google OAuth token
async function revokeGoogleToken(token) {
    try {
        const response = await fetch('https://accounts.google.com/o/oauth2/revoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `token=${token}`
        });

        if (response.ok) {
            console.log('Token successfully revoked.');
        } else {
            console.error('Error revoking token:', response.statusText);
        }
    } catch (error) {
        console.error('Error revoking token:', error.message);
    }
}

// Function to clear OAuth tokens associated with the user
async function clearOAuthTokens(userId) {
    try {
        // Assuming you have a User model with an OAuthTokens field, you can clear the tokens as follows:
        const user = await User.findById(userId);

        if (user) {
            user.oauthTokens = []; // Assuming oauthTokens is an array field in your User model
            await user.save();
            console.log('OAuth tokens cleared for user:', userId);
        } else {
            console.error('User not found:', userId);
        }
    } catch (error) {
        console.error('Error clearing OAuth tokens:', error.message);
    }
}

module.exports = {
    revokeGoogleToken,
    clearOAuthTokens
};