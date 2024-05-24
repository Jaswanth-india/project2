let countriesList=[];
let status1;
let statesList=[];
let statesDataFetchStatus;
let countryIso2;
let stateIso2;
let citiesList=[];
let fetchDataApproval;
let firstDate=[];
fetch("https://api.countrystatecity.in/v1/countries", {headers:{"X-CSCAPI-KEY":"NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="}})
                .then(response => response.json())
                .then(result => {
                    countriesList=result;
                    status1="success1";
                    document.querySelector("section").style.display="none";
                })
                .catch(error => console.log('error', error));

function connectionTimedOutFun(){
    setTimeout(()=>{
        if(status1!="success1" & status1!="success2" & status1!="success3"){
            document.querySelector("section").innerText="Connection TimedOut please reload the page";
        }
    },10000);
}
connectionTimedOutFun();

document.querySelector("#countryInput").addEventListener("input",()=>{
    if(status1=="success1" | status1=="success2" | status1=="success3" | status1=="approved"){
        if(document.querySelector("#countryInput").value.length==0){
            document.querySelector("#countrySuggestions").style.display="none";
        }
        else{
            document.querySelector("#countrySuggestions").style.display="block";
        }
        document.querySelector("#countrySuggestions").innerHTML="";
        let lengthOfInput=document.querySelector("#countryInput").value.length;
        let countryName;
        let slicedCountryName;
        let newDiv;
        for(let i=0;i<countriesList.length;i++){
            countryName = countriesList[i].name;
            countryName=countryName.toUpperCase();
            slicedCountryName=countryName.slice(0,lengthOfInput);
            if(slicedCountryName==document.querySelector("#countryInput").value.toUpperCase() & lengthOfInput>=1){
                newDiv=document.createElement("div")
                document.querySelector("#countrySuggestions").appendChild(newDiv);
                newDiv.innerText=countriesList[i].name;
                newDiv.style.backgroundColor="white";
                newDiv.style.borderWidth="2px";
                newDiv.style.borderStyle="solid";
                newDiv.style.borderColor="black";
                newDiv.style.padding="3px";
                newDiv.style.width="100%";
                newDiv.style.marginBottom="4px";
            }
        }

        for(let i=0;i<document.querySelectorAll("#countrySuggestions div").length;i++){
            document.querySelectorAll("#countrySuggestions div")[i].addEventListener("click",()=>{
                document.querySelector("#countryInput").value=document.querySelectorAll("#countrySuggestions div")[i].innerText;
                document.querySelector("#countrySuggestions").style.display="none";
                countryName=document.querySelectorAll("#countrySuggestions div")[i].innerText;
                countryName=countryName[0].toUpperCase()+countryName.slice(1,countryName.length);
                for(let i=0;i<countriesList.length;i++){
                    if(countriesList[i].name==countryName){
                        countryIso2=countriesList[i].iso2
                        break;
                    }
                }
                document.querySelector("section").style.display="flex";
                fetch("https://api.countrystatecity.in/v1/countries/"+countryIso2+"/states", {headers:{"X-CSCAPI-KEY":"NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="}})
                .then((result)=>result.json())
                .then((result)=>{
                    statesDataFetchStatus="success2";
                    statesList=result;
                    document.querySelector("section").style.display="none";
                })
                connectionTimedOutFun();
                document.querySelector("#stateInput").addEventListener("input",()=>{
                    document.querySelector("#stateSuggestions").innerHTML="";
                    for(let i=0;i<statesList.length;i++){
                        let stateName=statesList[i].name;
                        let input = document.querySelector("#stateInput").value;
                        let lengthOfInput= document.querySelector("#stateInput").value.length;
                        let slicedStateName=stateName.slice(0,lengthOfInput);
                        if(slicedStateName.toUpperCase()==input.toUpperCase()){
                            document.querySelector("#stateSuggestions").style.display="block";
                            let newDiv=document.createElement("div");   
                            document.querySelector("#stateSuggestions").appendChild(newDiv);
                            newDiv.innerText=stateName;
                            newDiv.style.backgroundColor="white";
                            newDiv.style.width="100%";
                            newDiv.style.padding="3px";
                            newDiv.style.borderWidth="2px";
                            newDiv.style.borderStyle="solid";
                            newDiv.style.borderColor="black";
                            newDiv.style.marginBottom="4px";
                        }
                    }

                    for(let i=0;i<document.querySelectorAll("#stateSuggestions div").length;i++){
                        document.querySelectorAll("#stateSuggestions div")[i].addEventListener("click",()=>{
                            document.querySelector("#stateInput").value=document.querySelectorAll("#stateSuggestions div")[i].innerText;
                            document.querySelector("#stateSuggestions").style.display="none";
                            for(let j=0;j<statesList.length;j++){
                                if(document.querySelectorAll("#stateSuggestions div")[i].innerText==statesList[j].name){
                                    stateIso2=statesList[j].iso2;
                                }
                            }
                            document.querySelector("section").style.display="flex";
                            fetch("https://api.countrystatecity.in/v1/countries/"+countryIso2+"/states/"+stateIso2+"/cities",{headers:{"X-CSCAPI-KEY":"NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=="}})
                            .then((result)=>result.json())
                            .then((result)=>{
                                document.querySelector("section").style.display="none";
                                status1="success3";
                                citiesList=result;
                            })
                            connectionTimedOutFun();
                            document.querySelector("#cityInput").addEventListener("input",()=>{
                                fetchDataApproval=false;
                                document.querySelector("#citySuggestions").innerHTML="";
                                for(let i=0;i<citiesList.length;i++){
                                    let cityName=citiesList[i].name;
                                    let cityInputValue=document.querySelector("#cityInput").value;
                                    let slicedCityName=cityName.slice(0,cityInputValue.length);
                                    if(slicedCityName.toUpperCase()==cityInputValue.toUpperCase() & document.querySelector("#cityInput").value!=""){
                                        document.querySelector("#citySuggestions").style.display="block";
                                        let newDiv =document.createElement("div");
                                        newDiv.innerText=citiesList[i].name;
                                        document.querySelector("#citySuggestions").appendChild(newDiv);
                                        newDiv.style.width="100%";
                                        newDiv.style.padding="3px";
                                        newDiv.style.marginBottom="4px";
                                        newDiv.style.borderStyle="solid";
                                        newDiv.style.borderColor="black";
                                        newDiv.style.borderWidth="2px";
                                        newDiv.style.backgroundColor="white";
                                    }
                                }
                                for(let i=0;i<document.querySelectorAll("#citySuggestions div").length;i++){
                                    document.querySelectorAll("#citySuggestions div")[i].addEventListener("click",()=>{
                                        document.querySelector("#citySuggestions").style.display="none";
                                        document.querySelector("#cityInput").value=document.querySelectorAll("#citySuggestions div")[i].innerText;
                                        fetchDataApproval=true;
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    }
})  

document.querySelector("button").addEventListener("click",()=>{
    
    if(fetchDataApproval){
        let a=[];
        /* document.querySelector("section").style.display="flex"; */
        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+document.querySelector("#cityInput").value+"&limit=5&appid=64e7716c87ee60c1455a8a395f4da7f2")
        .then((output)=>output.json())
        .then((output)=>{
            a=[output[0].lat,output[0].lon];
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a[0]}&lon=${a[1]}&appid=64e7716c87ee60c1455a8a395f4da7f2`)
            .then((output)=>output.json())
            .then((output)=>{
                document.querySelector("#cityName").innerText=document.querySelector("#cityInput").value;
                document.querySelector("#temperature").innerText=output.main.temp-273;
                document.querySelector("#temperature").innerText+=" °C";
                document.querySelector("#minTemp").innerText=output.main.temp_min-273;
                document.querySelector("#minTemp").innerText+=" °C";
                document.querySelector("#maxTemp").innerText=output.main.temp_max-273;
                document.querySelector("#maxTemp").innerText+=" °C";
                document.querySelector("#pressure").innerText=output.main.pressure;
                document.querySelector("#pressure").innerText+=" mb";
                document.querySelector("#humidity").innerText=output.main.humidity;
                document.querySelector("#humidity").innerText+=" g/m";
                document.querySelector("#groundLevel").innerText=output.main.grnd_level+" Pa";
                document.querySelector("#feelsLike").innerText=output.main.feels_like-273;
                document.querySelector("#feelsLike").innerText+=" °C";
                document.querySelector("#visibility").innerText=output.visibility+" km";
                document.querySelector("#seaLevel").innerText=output.main.sea_level+" Pa";
                document.querySelector("#icon").src=`https://openweathermap.org/img/wn/${output.weather[0].icon}@2x.png`;
                document.querySelector("#descreption").innerText=output.weather[0].description;
                fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+a[0]+"&lon="+a[1]+"&appid=64e7716c87ee60c1455a8a395f4da7f2")
                .then((output)=>output.json())
                .then((output)=>{
                    firstDate[0]=output.list[0].dt_txt;
                    firstDate[0]=firstDate[0].slice(0,10);
                    firstDate[1]=firstDate[0].slice(8,10);
                    firstDate[1]=Number(firstDate[1]);
                    document.querySelector("article:nth-of-type(2) div div:nth-of-type(1)").innerText=`[${firstDate[0]}]`
                    document.querySelectorAll("article:nth-of-type(2) table tr td")[2].innerText=output.list[0].main.temp+"°C";
                    document.querySelectorAll("article:nth-of-type(2) table tr td")[5].innerText=output.list[0].wind.speed+"meters";
                    document.querySelectorAll("article:nth-of-type(2) table tr td")[8].innerText=output.list[0].main.humidity+"g/m3";
                    document.querySelectorAll("article:nth-of-type(2) table tr td")[11].innerText=output.list[0].visibility+"m"
                    let currentDate=[];
                    let headingMonitor;.innerText=`[${currentDate}]`
                    let tdmonitor=11;
                    for(let j=0;j<40;j++){
                        currentDate[0]=output.list[j].dt_txt;
                        currentDate[0]=currentDate[0].slice(0,10);
                        currentDate[1]=currentDate[0].slice(8,10);
                        [1]=Number(currentDate[1]);
                        if(currentDate[1]==firstDate[1]+1){
                            firstDate[1]+=1;
                            document.querySelector(`article:nth-of-type(2) div div:nth-of-type(${headingMonitor})`).innerText=`[${currentDate}]`
                            document.querySelectorAll("article:nth-of-type(2) table tr td")[tdmonitor+3].innerText=output.list[0].main.temp+"°C";
                            document.querySelectorAll("article:nth-of-type(2) table tr td")[tdmonitor+6].innerText=output.list[0].wind.speed+"meter";
                            document.querySelectorAll("article:nth-of-type(2) table tr td")[tdmonitor+9].innerText=output.list[0].main.humidity+"g/m3";
                            document.querySelectorAll("article:nth-of-type(2) table tr td")[tdmonitor+12].innerText=output.list[0].visibility+"m";
                        }
                    }
                })
            })
        })
    }
});


/* let a;
locationData=fetch("http://api.openweathermap.org/geo/1.0/direct?q=Nandyal&limit=5&appid=64e7716c87ee60c1455a8a395f4da7f2"){
    
}
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

/* fetch("http://api.openweathermap.org/geo/1.0/direct?q=Nandyal&limit=5&appid=64e7716c87ee60c1455a8a395f4da7f2")
.then((output)=>output.json())
.then((output)=>{
    a=[output[0].lat,output[0].lon];
    console.log(a);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a[0]}&lon=${a[1]}&appid=64e7716c87ee60c1455a8a395f4da7f2`)
    .then((output)=>output.json()).then((output)=>{console.log(output)});
}); */