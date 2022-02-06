//VARIABLES

    //API
    var apiKey = "a49571aaab6c39d649d6563704a37042";

    //Dates - Current Forecast
    
    //Future Forecast

    //Search History






//FUNCTIONS

    //Click Even Listener - Search for City & Local Storage of Searched City 
    $("#searchBtn").on("click", function(event){
        event.preventDefault();

        //City Input
        var city = $("#city").val().trim();
        currentWeather(city);

        //Check if City Input is in Search History

        //Locally Store City Search

    })




    //function currentWeather - Present with Curent Weather Conditions
    function currentWeather(city) {

        //API Query URL
        var queryURL = `https://openweathermap.org/current#:~:text=api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

        fetch(queryURL)
        .then(function(response) {
            response.json().then(function(data){

            });
        });
    };

        //View Current Weather Conditions 
        //View City Name
        //View the Date 
        //View Icon of Weather Condition
        //View Icon of Temperature
        //View Icon of Humidity
        //View Icon of Wind Speed
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


