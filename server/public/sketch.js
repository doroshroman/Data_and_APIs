function setup(){
            noCanvas();
            const video = createCapture(VIDEO);
            video.size(520, 340);

            let lat, lon;

            document.getElementById('send-data').addEventListener('click', async () =>{
                const mood = document.getElementById('mood').value;
                video.loadPixels();
                const image64 = video.canvas.toDataURL();

                const data = { lat, lon, mood, image64};
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                const response = await fetch('/api', options);
                const json = await response.json();
                console.log(json);
            });

            if('geolocation' in navigator){
                console.log('geolocation is available');
                navigator.geolocation.getCurrentPosition(async position =>{
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;

                    document.getElementById('lat').textContent = lat.toFixed(2);
                    document.getElementById('lon').textContent = lon.toFixed(2);
            });
            }else{
                console.log('geolocation isn\'t available');
            }
}