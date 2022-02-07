//VARIABLES

    //API Key
    var apiKey = "a49571aaab6c39d649d6563704a37042";
    
    //City Search
    var citySearch = document.querySelector("#search-city");
    
    
    //Current Forecast
    var currentContent = document.querySelector("#current-content");
    var cityName = document.querySelector("#city-name");

    //Future Forecast
    var forecastTitle = document.querySelector("#forecast");
    var futureContent = document.querySelector("#fiveday-container");

    //Search History
    var searchedCities = [];
    var previousCityBtn = document.querySelector("#search-list")






//FUNCTIONS
    //1. Search City Weather & Locally Store City Search
        //Click Even Listener - Search for City & Local Storage of Searched City 
        $("#searchBtn").on("click", function(event){
            event.preventDefault();

            //City Input
            var city = $("#city").val().trim();
            currentWeather(city);
            fiveDay(city);

            //Check if City Input is in Search History
            if (!searchedCities.includes(city)) {
                searchedCities.push(city);

                var searchedCity = $(`${city}`);

                $("#searched-cities").append(searchedCity);
            };

            //Locally Store City Search
            localStorage.setItem("city", JSON.stringify(searchedCities));
            console.log(searchedCities);

            //Previous City
            previousCity(city);


        });



    //2. Current Weather Conditions
        //function currentWeather - Fetch API Info for Current Weather
        function currentWeather(city) {
            //API Key
            var apiKey = "a49571aaab6c39d649d6563704a37042"

            //API Query URL
            var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
            
            
        
            //option 2 - jSON text data transfer
            fetch(queryURL)
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

            //View City Name & Clear Old Info
            currentContent.textContent = " ";
            cityName.textContent = $("#city").val().trim();
            //cityName.textContent = $("#city").val().trim();

            //View the Date
            var today = document.createElement("span");
            today.textContent= "  -  " + moment(weather.dt.value).format("MMM D, YYYY");
            cityName.appendChild(today);

            //View Icon of Weather Condition
            var weatherCondition = document.createElement("img");
            weatherCondition.setAttribute("src",`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
            cityName.appendChild(weatherCondition);


            //View Temperature Info
            var temperatureInfo = document.createElement("span");
            temperatureInfo.textContent = "Temperature: " + weather.main.temp + " °F";
            temperatureInfo.classList = "list-group-item";
            currentContent.appendChild(temperatureInfo);

            //View Humidity Info
            var humidityInfo = document.createElement("span");
            humidityInfo.textContent = "Humidity: " + weather.main.humidity + " %";
            humidityInfo.classList = "list-group-item";
            currentContent.appendChild(humidityInfo);

            //View Wind Speed Info
            var windSpeed = document.createElement("span");
            windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " mph";
            windSpeed.classList = "list-group-item";
            currentContent.appendChild(windSpeed);

            //Use City Lat & Lon to look up UV
            var lat = weather.coord.lat;
            var long = weather.coord.lon;
            lookupUV(lat,long);
            
        };

        // function lookupUV - Get API Data for UV Index Check
        var lookupUV = function (lat, long) {
             //API Key
             var apiKey = "a49571aaab6c39d649d6563704a37042"

             //API Query URL
             var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${long}`

            //fetch data - jSON
            fetch(queryURL)
            .then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    uvInfo(data);
                });
            });
        };

        //function uvInfo - color that indicates whether conditions are favorable, moderate, or severe
        var uvInfo = function (index) {
            //UV Index Element
            var uvIndex = document.createElement("div");
            uvIndex.textContent = "UV Index: ";
            uvIndex.classList = "list-group-item";

            //UV Index Value Assessment & Color
            uvValue = document.createElement("span");
            uvValue.textContent = index.value;

                //If favorable - green
                if (index.value <=2) {
                    uvValue.classList = "favorable"
                }

                //If severe - red
                else if (index.value >8) {
                    uvValue.classList = "severe"
                }

                //If moderate - yellow
                else { 
                    uvValue.classList = "moderate"
                };
            
                uvIndex.appendChild(uvValue);

            //Append to Current Conditions Section
            currentContent.appendChild(uvIndex);

        };


    //3. Future Weather Conditions
        
        //function fiveDay - fetch API data
        var fiveDay = function (city) {

            //API Key
            var apiKey = "a49571aaab6c39d649d6563704a37042"

            //API Query URL
            var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

            //fetch date - jSON
            fetch (queryURL)
            .then (function(response){
                response.json().then(function(data){
                    forecastInfo(data);
                    console.log(data);
                });
            });
        };

        //function forecastInfo - 5 day weather forcast display
        var forecastInfo = function(weather) {
            //Title & Clear Old Content
            futureContent.textContent = " "
            forecastTitle.textContent = "5 Day Forecast";

            //Forecast Loop
            var forecast = weather.list;
                for (let i = 1; i < 6; i++) {
                    var dayForecast = forecast[i];

                    var fivedayForecast = document.createElement("div");
                    fivedayForecast.classList = "card pl-3 pt-3 mb-3 bg-primary text-light";

                    console.log(dayForecast);

                    //View the Date 
                    var forecastDates = document.createElement("h5");
                    forecastDates.textContent = moment.unix(dayForecast.dt).format("MMM D, YYYY");
                    forecastDates.classList = "card-header text-center";
                    fivedayForecast.appendChild(forecastDates);
                    
                    //View Icon of Weather Condition
                    var weatherCondition = document.createElement("img");
                    weatherCondition.setAttribute("src",`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`);
                    weatherCondition.classList = "card-body text-center";
                    fivedayForecast.appendChild(weatherCondition);


                    //View Temperature Info
                    var forecastTemperature = document.createElement("span");
                    forecastTemperature.textContent = "Temperature: " + dayForecast.main.temp + " °F";
                    forecastTemperature.classList = "card-body text-center";
                    fivedayForecast.appendChild(forecastTemperature);

                    //View Humidity Info
                    var forecastHumidity = document.createElement("span");
                    forecastHumidity.textContent = "Humidity: " + dayForecast.main.humidity + " %";
                    forecastHumidity.classList = "card-body text-center";
                    fivedayForecast.appendChild(forecastHumidity);

                    //View Wind Speed Info
                    var forecastWind = document.createElement("span");
                    forecastWind.textContent = "Wind Speed: " + dayForecast.wind.speed + " mph";
                    forecastWind.classList = "card-body text-center";
                    fivedayForecast.appendChild(forecastWind);


                    //append to 5 day forcast
                    futureContent.appendChild(fivedayForecast);

                };

        };

    //4. Search History Selection 

        //function previousCity - button selection
        var previousCity = function(previousCity){

            console.log(previousCity);

            selectCity = document.createElement("button");
            selectCity.textContent = previousCity;
            selectCity.classList = "d-flex w-100 btn-light p-2";
            selectCity.setAttribute("data-city", previousCity);
            selectCity.setAttribute("type", "submit");

            previousCityBtn.prepend(selectCity);

        }

        //function searchPrevious - Show Present and Future Weather conditions when City is Selected from Search History
        var searchPrevious = function(event){


           var city = event.target.getAttribute("data-city")

           currentContent.textContent = " ";
           cityName.textContent = city;
           
           if (city) {
               currentWeather(city);
               fiveDay(city);  
           }
        }

        //eventListener
        previousCityBtn.addEventListener("click", searchPrevious);
            
       


