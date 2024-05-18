/* let a;
locationData=fetch("http://api.openweathermap.org/geo/1.0/direct?q=Nandyal&limit=5&appid=64e7716c87ee60c1455a8a395f4da7f2")
                .then((output)=>output.json())
                .then((output)=>{
                    a=[output[0].lat,output[0].lon];
                    console.log(a);
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a[0]}&lon=${a[1]}&appid=64e7716c87ee60c1455a8a395f4da7f2`)
                    .then((output)=>output.json()).then((output)=>{console.log(`${output.main.temp-273} °C`)});
                }); */

                /* const successCallback = (position) => {
                    console.log(position.coords.latitude,position.coords.longitude);
                    // Process the location data here
                };
                
                const errorCallback = (error) => {
                    console.log(error);
                    // Handle errors (e.g., if the user denies permission)
                };
                
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
                setTimeout(()=>{
                    navigator.permissions.query({name:'geolocation'}).then(function(result){
                        console.log(result.state);
                    });
                },10000); */
                
                /* var headers = new Headers();
                headers.append("X-CSCAPI-KEY", "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==");
                
                var requestOptions = {
                   method: 'GET',
                   headers: headers,
                   redirect: 'follow'
                };
                
                fetch("https://api.countrystatecity.in/v1/countries/IN/states/AP/cities", {headers:{"X-CSCAPI-KEY":"NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="}})
                .then(response => response.text())
                .then(result => document.querySelector("div").innerHTML=result)
                .catch(error => console.log('error', error)); */
                