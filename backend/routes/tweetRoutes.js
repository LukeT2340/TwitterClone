const express = require('express');

const router = express.Router();
const { addUser, query } = require('../utils/db.js');

// Handle retreive tweets request
const retreiveTweetHandler = async (req, res) => {
    const qry = 'SELECT * FROM tweets ORDER BY date DESC LIMIT 15';
    query(qry, [], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json({ tweets: results });
      } else {
        res.status(401).json({ message: 'Server error' });
      }
    });
  };
  
// Endpoint for tweet retrieve requests
router.get('/getTweets', retreiveTweetHandler);

// Handle get user info request
const retreiveUserInfo = async (req, res) => {
  const user_id = req.query.userId; 
  const qry = "SELECT * FROM users WHERE id = ?";
  const params = [ user_id ];
  query(qry, params, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      const user = results[0];
      const user_id = user.id;
      const name = user.name;
      const handle = user.handle;
      const profilePictureURL = user.profile_picture_url;
      res.status(200).json({ user_id, name, handle, profilePictureURL });
    } else {
      res.status(404).json({ message: 'User not found' }); 
    }
  });
};

// Endpoint for user retrieve requests
router.get('/getUser', retreiveUserInfo);

module.exports = router;