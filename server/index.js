const express = require('express');
const Datastore = require('nedb');
const app = express();
const path = require('path');
const fs = require('fs');

app.listen(3000, () => console.log('listening on the 3000'));

app.use(express.static('public'));
app.use('/iss',express.static(path.join(__dirname, '../json')));

// To correctly receive the json data
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
// load if existed or create new 
database.loadDatabase();

app.post('/api', (request, response) =>{ 
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
       status: "success",
       lat: data.lat,
       lon: data.lon,
       timestamp: data.timestamp,
       mood: data.mood
   });
   
});
