var count, lat, lon, rad, cuisine, map;
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
    event.preventDefault();
    // Make sure browser supports this feature
    if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
});


// This will get called after getCurrentPosition()
function showPosition(position) {
    // Grab coordinates from the given object
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Call our next function, passing on the coordinates
    zomatoCall(lat, lon);
};

function zomatoCall(lat, lon) {
    //inputCuisine = $('#cuisine').val();
    inputCuisine = $('#cuisine').val();
    cuisine = cuisineIds[inputCuisine];
    console.log(inputCuisine, cuisine);
    rad = Math.floor($('#radius').val() / 0.00062137);
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?apikey=' + apiKey + '&count=' + count + '&lat=' + lat + '&lon=' + lon + '&radius=' + rad + '&cuisines=' + cuisine;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        $("#results").html("").attr("class", "row center");
        var rand = Math.floor(Math.random() * 10);
        var res = response.restaurants[rand].restaurant;
        var newLat = res.location.latitude;
        var newLon = res.location.longitude;
        var resName = $("<h3>").text(res.name);
        var resLink = $("<a>").attr("href", res.url);
        $("#results").append(resLink);
        resLink.append(resName);
        var resThumb = $("<img>").attr("src", res.thumb);
        $("#results").append(resThumb);
        var resTimes = $("<p>").text(res.timings);
        $("#results").append(resTimes);
        var resRating = $("<p>").text("Average Rating from 0 to 5 is: " + res.user_rating.aggregate_rating);
        $("#results").append(resRating);

        console.log(resName);
        callMap(newLat, newLon);
    });
}

function callMap(newLat, newLon) {
    $("#map").attr("style", "block")
    var myLatLng = new google.maps.LatLng(newLat, newLon);
    var marker = new google.maps.Marker({ position: myLatLng, map: map });
    map = new google.maps.Map(document.getElementById("map"));
    map.setCenter(myLatLng);
    map.setZoom(17);
    marker.setMap(map);
    console.log(newLat, newLon);

    var newSearch = $("<ul>");
    var newSearchBtn = $("<li>");
    newSearch.attr("id", "nav-mobile");
    newSearch.addClass("left");
    $("#navBar").append(newSearch);
    newSearchBtn.html('<a href="index.html">Search Again</a>');
    newSearch.append(newSearchBtn);
}
