(function($){
    var defs = {
        // default Greenwich
        lat : 0,
        lon : 51.4772,
    
        wind : 0,
        temp : 0,
    
        windDirection : [
            "N", "NE", "NE", "E",
            "E", "SE", "SE", "S",
            "S", "SW", "SW", "W",
            "W", "NW", "NW", "N",
        ],
        
        tempUnits : 'metric',
        windUnits : 'metric',

        locationAppUrl : 'https://ipinfo.io/',
        weatherAppUrl : 'https://api.openweathermap.org/data/2.5/weather',
        weatherAppId : '&appid=7c46eb5b82808ae15ae7023e279d74da',
        weatherIcon : 'http://openweathermap.org/img/w/',
    };

    var units = {
        imperial : {
            temp: "&deg;F",
            wind:  "miles",
            transTemp: function() { // f2c
                defs.temp = (defs.temp - 32.00) / 18 * 10;
                defs.tempUnits = 'metric';
                return defs.temp.toFixed(0);
            },
            transWind: function() { // m2km 
                defs.wind = defs.wind * 1.609344;
                defs.windUnits = 'metric';
                return defs.wind.toFixed(2);
            },
        },
        metric   : {
            temp : "&deg;C",
            wind: "km/h",
            transTemp: function() { // c2f
                defs.temp = (defs.temp * 18 / 10) + 32.00;
                defs.tempUnits = 'imperial';
                return defs.temp.toFixed(0);
            },
            transWind: function() { // km2m
                defs.wind = defs.wind / 1.609344;
                defs.windUnits = 'imperial';
                return defs.wind.toFixed(2);
            },
        },
    };


    $.get(defs.locationAppUrl, getMeteo, 'jsonp')
    .fail(meteoError);


    function getMeteo(locationResponse) {
        if(locationResponse.country === "US") {
            defs.windUnits = 'imperial';
            defs.tempUnits = 'imperial';
        }
        defs.lat = locationResponse.loc.split(",")[0];
        defs.lon = locationResponse.loc.split(",")[1];
        var fullMeteoUrl =
            defs.weatherAppUrl +
            '?lat=' + defs.lat +
            '&lon=' + defs.lon +
            '&units=' + defs.tempUnits +
            defs.weatherAppId;
        $.get(fullMeteoUrl, meteoReport, 'jsonp')
        .fail(meteoError);
    }

    function meteoReport(meteoResponse) {
        $('#city').html(meteoResponse.name);
        $('#lat').html(defs.lat);
        $('#lon').html(defs.lon);

        var weather_ico = defs.weatherIcon +
            meteoResponse.weather[0].icon + '.png';
        var weather_alt= 'Weather condition: ' +
            meteoResponse.weather[0].description;
            
        var windDirLabel = Math.floor(meteoResponse.wind.deg / 22.5);
        
        $('#cond').html(meteoResponse.weather[0].description);
        $('#weather_icon').attr('src', weather_ico );
        $('#weather_icon').attr('alt', weather_alt );
        
        $('#pres').html(meteoResponse.main.pressure + " hPA");
        $('#cloud').html(meteoResponse.clouds.all + " %");
        $('#humid').html(meteoResponse.main.humidity + " %");

        defs.temp = parseFloat(meteoResponse.main.temp);
        $('#temperature').html(meteoResponse.main.temp);
        $('#tempUnits')
            .html(units[defs.tempUnits].temp);

        defs.wind = parseFloat(meteoResponse.wind.speed);
        $('#windDirection').html(defs.windDirection[windDirLabel]);
        $('#windSpeed').html(meteoResponse.wind.speed);
        $('#windUnits')
            .html(units[defs.windUnits].wind);

        $('#tempunits-from').html(units[defs.tempUnits].temp);
        $('#windunits-from').html(units[defs.windUnits].wind);
        $('#tempunits-to').html(units[
            (defs.tempUnits == 'metric') ? 'imperial' : 'metric'
        ].temp);
        $('#windunits-to').html(units[
            (defs.windUnits == 'metric') ? 'imperial' : 'metric'
        ].wind);
        $('#k2m').html(units[defs.windUnits].wind);
        $('#toggleTemperature').click(changeTempUnits);
        $('#toggleWindSpeed').click(changeWindUnits);

        $('.fade').fadeIn(5000);
    }


    function changeTempUnits() {
        $('#tempunits-to').html(units[defs.tempUnits].temp);
        $('#temperature')
            .html(units[defs.tempUnits].transTemp());
        $('#tempUnits').html(units[defs.tempUnits].temp);
        $('#tempunits-from').html(units[defs.tempUnits].temp);
        $('#toggleTemperature').blur();
    };
    
    function changeWindUnits(){
        $('#windunits-to').html(units[defs.windUnits].wind);
        $('#windSpeed')
            .html(units[defs.windUnits].transWind());
        $('#windUnits').html(units[defs.windUnits].wind);
        $('#windunits-from').html(units[defs.windUnits].wind);
        $('#toggleWindSpeed').blur();
    };
    
    

    function meteoError() {
        console.log('missing');
        $('.fade').fadeIn(5000);
    };
  
})(jQuery)
    
