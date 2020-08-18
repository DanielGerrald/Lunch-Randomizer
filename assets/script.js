var count, lat, lon, rad, cuisine, userLat, userLon;
var restaurantData = [];
var cuisineIds = {
    "African": 152,
    "American": 1,
    "Argentine": 151,
    "Armenian": 175,
    "Asian": 3,
    "BBQ": 193,
    "Bagels": 955,
    "Bakery": 5,
    "Bar Food": 227,
    "Beverages": 270,
    "Brazilian": 159,
    "Breakfast": 182,
    "British": 133,
    "Bubble Tea": 247,
    "Burger": 168,
    "Cafe": 30,
    "Cajun": 491,
    "California": 956,
    "Caribbean": 158,
    "Chinese": 25,
    "Coffee and Tea": 161,
    "Colombian": 287,
    "Crepes": 881,
    "Cuban": 153,
    "Deli": 192,
    "Desserts": 100,
    "Dim Sum": 411,
    "Diner": 541,
    "Dominican": 958,
    "Donuts": 959,
    "Drinks Only": 268,
    "Eastern European": 651,
    "Ethiopian": 149,
    "European": 38,
    "Fast Food": 40,
    "Floribbean": 960,
    "Fondue": 318,
    "French": 45,
    "Frozen Yogurt": 501,
    "Fusion": 274,
    "German": 134,
    "Greek": 156,
    "Grill": 181,
    "Hawaiian": 521,
    "Healthy Food": 143,
    "Ice Cream": 233,
    "Indian": 148,
    "International": 154,
    "Irish": 135,
    "Italian": 55,
    "Jamaican": 207,
    "Japanese": 60,
    "Juices": 164,
    "Kebab": 178,
    "Korean": 67,
    "Laotian": 901,
    "Latin American": 136,
    "Lebanese": 66,
    "Mediterranean": 70,
    "Mexican": 73,
    "Middle Eastern": 137,
    "Mongolian": 74,
    "Moroccan": 147,
    "Nepalese": 117,
    "New American": 996,
    "Pakistani": 139,
    "Patisserie": 183,
    "Peruvian": 162,
    "Pizza": 82,
    "Polish": 219,
    "Pub Food": 983,
    "Ramen": 320,
    "Russian": 84,
    "Salad": 998,
    "Salvadorean": 601,
    "Sandwich": 304,
    "Seafood": 83,
    "Soul Food": 461,
    "Southern": 471,
    "Southwestern": 966,
    "Spanish": 89,
    "Steak": 141,
    "Sushi": 177,
    "Swedish": 211,
    "Taco": 997,
    "Taiwanese": 190,
    "Tapas": 179,
    "Tea": 163,
    "Teriyaki": 964,
    "Tex-Mex": 150,
    "Thai": 95,
    "Turkish": 142,
    "Vegetarian": 308,
    "Vietnamese": 99
};
apiKey = '6ebe4f4724f4745f9cf521042143f3f6';
count = 10; //placeholder value

//successful getCurrentPosition function call
function getPosSuccess(pos) {
    userLat = pos.coords.latitude;
    userLon = pos.coords.longitude;

    //find the ID of the cuisine input by the user
    inputCuisine = $('#cuisine').val();
    //I used array syntax below because this hated .syntax for unknown reason
    cuisine = cuisineIds[inputCuisine];

    //get user radius input
    rad = $('#radius').val();

    //setup API request
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?apikey=' + apiKey +
        '&count=' + count + '&lat=' + userLat + '&lon=' + userLon + '&radius=' + rad + '&cuisines=' + cuisine;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response); //debug log for response
        $.each(response.restaurants, function (index) {
            //create new object with data to input to google maps API
            var restaurant = {
                name: response.restaurants[index].restaurant.name,
                lat: response.restaurants[index].restaurant.location.latitude,
                lon: response.restaurants[index].restaurant.location.longitude
            };
            restaurantData.push(restaurant);
        });
        console.log(restaurantData); //debug log for array of restaurant objects
    });
};

$(document).ready(function () {

    //autocomplete for cuisine input field
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

    //When the user submits their request...
    $('#userInput').on('submit', function () {

        event.preventDefault();

        //get current position of user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosSuccess);
        };

    });
});