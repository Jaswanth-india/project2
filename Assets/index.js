let countriesList=[];
let status1;
let statesList=[];
let statesDataFetchStatus;
let countryIso2;
let stateIso2;
let citiesList=[];
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
    if(status1=="success"){
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
                                    console.log(statesList);
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

                        })
                    }

                })
            })
        }
    }
})  

document.querySelector("button").addEventListener("click",()=>{

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