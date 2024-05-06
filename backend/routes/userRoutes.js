const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const router = express.Router();
const { addUser } = require('../utils/db.js');

// Set up session middleware
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

// Checks whether username is valid
const isUsernameValid = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return (username.length > 0 && username.length < 16 && regex.test(username));
}

// Checks whether email is valid
const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Checks whether password is valid
const isPasswordValid = (password) => {
    return password.length > 6;
}

// Hash password
const hashString = (inputString) => {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
  };

// Handle sign in request
const signUpHandler = async (req, res) => {
    const formData = req.body;

    const username = formData.username;
    const email = formData.email;
    const password = formData.password;

    if (!isUsernameValid(username)) {
        res.status(400).json({ error: "InvalidUsername", message: "The username is invalid. Usernames must be between 1 and 15 characters long (inclusive) and not contain any special characters." });
        return;
    }
    if (!isEmailValid(email)) {
        res.status(400).json({ error: "InvalidEmail", message: "The email you entered is invalid. Please include the @ and domain name in the email." });
        return;
    }
    if (!isPasswordValid(password)) {
        res.status(400).json({ error: "InvalidPassword", message: "The password you entered is invalid. Passwords must be 7 or more characters long." });
        return;
    }
    try {
        const hashedPassword = hashString(password);
        const result = await addUser(username, hashedPassword, email);
        console.log('User added successfully:', result);
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "DuplicateError", message: "Someone with the entered username or email already exists." }); 
        } else {
            res.status(500).json({ error: "ServerError", message: "An unexpected error occurred. Please try again later." });
        }
        return;
    }
}

// Endpoint for sign up requests
router.post('/signup', signUpHandler);

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashString(password);

    const sql = 'SELECT * FROM users WHERE username = ? AND hashed_password = ?';
    const params = [username, hashedPassword];
    query(sql, params, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        req.session.user = results[0];
        res.status(200).json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  });

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(401).json({ message: 'You are not logged in' });
    }
});
  
// Session status route
router.get('/session/status', (req, res) => {
if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
} else {
    res.status(200).json({ loggedIn: false });
}
});
  
// Example protected route
router.get('/protected', (req, res) => {
if (req.session.user) {
    res.status(200).json({ message: 'This is a protected route', user: req.session.user });
} else {
    res.status(401).json({ message: 'Unauthorized' });
}
});

module.exports = router;