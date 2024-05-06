const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes.js'); 

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes); 

app.listen(80, () => {
    console.log("Listening");
})