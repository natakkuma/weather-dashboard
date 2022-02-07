//VARIABLES

    

    
    //City Search
    var citySearch = document.querySelector("#search-city");
    var city = document.querySelector("#city");
    
    //Current Forecast
    var currentContent = document.querySelector("#current-content");
    var cityName = document.querySelector("#city-name");

    //Future Forecast
    var futureForecast = document.querySelector("#forecast");
    var futureContent = document.querySelector("#fiveday-container");

    //Search History
    var searchedCities = [];






//FUNCTIONS

    //Click Even Listener - Search for City & Local Storage of Searched City 
    $("#searchBtn").on("click", function(event){
        event.preventDefault();

        //City Input
        var city = $("#city").val().trim();
        currentWeather(city);

        //Check if City Input is in Search History
        if (!searchedCities.includes(city)) {
            searchedCities.push(city);

            var searchedCity = $(`<li class="searched-list">${city}</li>`);

            $("#searched-cities").append(searchedCity);
        };

        //Locally Store City Search
        localStorage.setItem("city", JSON.stringify(searchedCities));
        console.log(searchedCities);

    });




    //function currentWeather - Present with Curent Weather Conditions
    function currentWeather(city) {
        //API Key
        var apiKey = "a49571aaab6c39d649d6563704a37042"

        //API Query URL
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        
        //option 1 - AJAX XML data transfer
        //$.ajax({
           //url: queryURL,
           //method: "GET" 
        //}).then
       
       //option 2 - jSON text data transfer
        fetch(queryURL)
        //.then(function (response) {
            //return response.json();
       // })
        //.then(function (data)
        .then(function(response) 
        {
            
            response.json().then(function(data){

                currentDisplay (data,city);

            });
        });
    };

    //function currentDisplay - View Current Weather Conditions 
    var currentDisplay = function(weather, searchCity){
        console.log(weather);

        //View City Name

        //View the Date 

        //View Icon of Weather Condition

        //View Icon of Temperature

        //View Icon of Humidity

        //View Icon of Wind Speed
         
    }

    
    //View UV Index 

    // When UV Index is viewed - Shows Color that indicates whether conditions are favorable, moderate, or severe

    //City Searched - Present with Future Weather Conditions

        //View 5 day weather forecast that displays:
            //View City Name
            //View the Date 
            //View Icon of Weather Condition
            //View Icon of Temperature
            //View Icon of Humidity
            //View Icon of Wind Speed



    //City Searched - Added to Search History (Local Storage) 

    //Show Present and Future Weather conditions when City is Selected from Search History


