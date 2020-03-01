const express = require('express');
const app = express();
const path = require("path");

app.listen(3000, () => console.log('listening on the 3000'));

app.use(express.static('public'));
app.use('/iss',express.static(path.join(__dirname, '../json')));

// To correctly receive the json data
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) =>{
   console.log(request.body);
   const data = request.body;
   response.json({
       status: "success",
       latitude: data.latitude,
       longitude: data.longitude
   });
});
