var count, lat, lon, rad, cuisine;
apiKey = '6ebe4f4724f4745f9cf521042143f3f6';
count = 10; //placeholder value
lat = 35.1793829; //placeholder value
lon = -80.7611376; //placeholder value

//successful getCurrentPosition function call
function getPosSuccess(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
};

$(document).ready(function () {

    $('input.autocomplete').autocomplete({
        data: {
            "African": null,
            "American": null,
            "Argentine": null,
            "Armenian": null,
            "Asian": null,
            "BBQ": null,
            "Bagels": null,
            "Bakery": null,
            "Bar Food": null,
            "Beverages": null,
            "Brazilian": null,
            "Breakfast": null,
            "British": null,
            "Bubble Tea": null,
            "Burger": null,
            "Cafe": null,
            "Cajun": null,
            "California": null,
            "Caribbean": null,
            "Chinese": null,
            "Coffee and Tea": null,
            "Colombian": null,
            "Crepes": null,
            "Cuban": null,
            "Deli": null,
            "Desserts": null,
            "Dim Sum": null,
            "Diner": null,
            "Dominican": null,
            "Donuts": null,
            "Drinks Only": null,
            "Eastern European": null,
            "Ethiopian": null,
            "European": null,
            "Fast Food": null,
            "Floribbean": null,
            "Fondue": null,
            "French": null,
            "Frozen Yogurt": null,
            "Fusion": null,
            "German": null,
            "Greek": null,
            "Grill": null,
            "Hawaiian": null,
            "Healthy Food": null,
            "Ice Cream": null,
            "Indian": null,
            "International": null,
            "Irish": null,
            "Italian": null,
            "Jamaican": null,
            "Japanese": null,
            "Juices": null,
            "Kebab": null,
            "Korean": null,
            "Laotian": null,
            "Latin American": null,
            "Lebanese": null,
            "Mediterranean": null,
            "Mexican": null,
            "Middle Eastern": null,
            "Mongolian": null,
            "Moroccan": null,
            "Nepalese": null,
            "New American": null,
            "Pakistani": null,
            "Patisserie": null,
            "Peruvian": null,
            "Pizza": null,
            "Polish": null,
            "Pub Food": null,
            "Ramen": null,
            "Russian": null,
            "Salad": null,
            "Salvadorean": null,
            "Sandwich": null,
            "Seafood": null,
            "Soul Food": null,
            "Southern": null,
            "Southwestern": null,
            "Spanish": null,
            "Steak": null,
            "Sushi": null,
            "Swedish": null,
            "Taco": null,
            "Taiwanese": null,
            "Tapas": null,
            "Tea": null,
            "Teriyaki": null,
            "Tex-Mex": null,
            "Thai": null,
            "Turkish": null,
            "Vegetarian": null,
            "Vietnamese": null
        }, limit: 3
    });

    $('#userInput').on('submit', function () {

        //get current position of user
        navigator.geolocation.getCurrentPosition(getPosSuccess);

        cuisine = $('#cuisine').val();
        rad = $('#radius').val();
        var queryURL = 'https://developers.zomato.com/api/v2.1/search?apikey=' + apiKey + '&count=' + count + '&lat=' + lat + '&lon=' + lon + '&radius=' + rad + '&cuisines=' + cuisine;
        console.log(queryURL);

        event.preventDefault();

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
        });
    });
});