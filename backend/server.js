const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes.js'); 
const tweetRoutes = require('./routes/tweetRoutes.js'); 

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
  }));

app.use('/users', userRoutes); 
app.use('/tweets', tweetRoutes); 

app.listen(80, () => {
    console.log("Listening");
})