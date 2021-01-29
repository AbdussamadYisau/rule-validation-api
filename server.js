const express = require('express');
const bodyParser = require('body-parser');
const base = require('./routes/baseRoute');
const app = express();


app.use(bodyParser.json());

//  For all CORS issues
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();    
});


// Base Route
app.use(base);

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
  