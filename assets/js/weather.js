// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");

    url_var = 'https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=aff4268b5009fde02d6331d776dde947'
    $.ajax({
        url: url_var,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.coord.lat);
        console.log(response.coord.lon);
        $('#city_name_h5').text(response.name)
        var temp_temp = ((response.main.temp-273.15) * 1.8 ) + 32 //((K-273.15)*1.8)+32
        $('#city_info').append($('<p>').text('Temperature: ' + temp_temp.toFixed(2) + ' F'));
        $('#city_info').append($('<p>').text('Humidity: ' + response.main.humidity));
        $('#city_info').append($('<p>').text('Wind Speed: ' + response.wind.speed + ' MPH'));

        url_var = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&exclude=hourly&appid=aff4268b5009fde02d6331d776dde947'

        $.ajax({
            url: url_var,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $('#forecast_container').empty();

            for (var i = 0; i < 6; i++) {
                var card_header = $('<h5>').addClass('card-title').text(response.daily[i].weather[0].main);
                var temp_temp = ((response.daily[i].temp.day-273.15) * 1.8 ) + 32 //((K-273.15)*1.8)+32
                var card_text = $('<p>').addClass('card-text').text('Temp: ' + temp_temp.toFixed(2) + ' F');

                var card_body = $('<div>').addClass('card-body');
                card_body.append(card_header);
                card_body.append(card_text);


                $('#forecast_container').append($('<div>')
                    .addClass('col-sm-2')
                    .append($('<div>')
                        .addClass('card')
                        .append(card_body)));
            }

        });
    });
});