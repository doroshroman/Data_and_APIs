const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.listen(3000, () => console.log('listening on the 3000'));

app.use(express.static('public'));
app.use('/iss',express.static(path.join(__dirname, '../json')));

// To correctly receive the json data
app.use(express.json({ limit: '1mb' }));

let firstTime = true;
let locations = [];

app.post('/api', (request, response) =>{ 

    // Read for the first time
    const stats = fs.statSync('locations.json');
    if(firstTime){
        // read location from file
        fs.readFile('locations.json', (err, read_data) =>{
            if(err){
                console.log(err);
                return;
            }
            json = stats["size"] == 0? [] : JSON.parse(read_data);
            locations = json;
        });
        firstTime = false;
    }

    const data = request.body;
    locations.push(data);
    
    response.json({
       status: "success",
       latitude: data.latitude,
       longitude: data.longitude
   });

   appendLog('locations.json', data);
});

function appendLog(path, data){
    const stats = fs.statSync(path);
    fs.readFile(path, (err, read_data) =>{
        if(err){
            console.log(err);
            return;
        }
        
        const json = stats["size"] == 0 ? [] : JSON.parse(read_data);
        json.push({
            'latitude':data.latitude,
            'longitude': data.longitude
        });
        
        fs.writeFile(path, JSON.stringify(json), (err) =>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log('Successfully writed into file!');
            });
   
    });
}