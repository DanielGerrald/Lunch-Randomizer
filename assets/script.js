var count, lat, lon, rad, cuisine, map;
var restaurantData = [];
var rand = Math.floor(Math.random() * 10);
var cuisineIds = {
    "african": 152,
    "american": 1,
    "argentine": 151,
    "armenian": 175,
    "asian": 3,
    "bbq": 193,
    "bagels": 955,
    "bakery": 5,
    "bar food": 227,
    "beverages": 270,
    "brazilian": 159,
    "breakfast": 182,
    "british": 133,
    "bubble Tea": 247,
    "burger": 168,
    "cafe": 30,
    "cajun": 491,
    "california": 956,
    "caribbean": 158,
    "chinese": 25,
    "coffee and tea": 161,
    "colombian": 287,
    "crepes": 881,
    "cuban": 153,
    "deli": 192,
    "desserts": 100,
    "dim sum": 411,
    "diner": 541,
    "dominican": 958,
    "donuts": 959,
    "drinks only": 268,
    "eastern european": 651,
    "ethiopian": 149,
    "european": 38,
    "fast food": 40,
    "floribbean": 960,
    "fondue": 318,
    "french": 45,
    "frozen yogurt": 501,
    "fusion": 274,
    "german": 134,
    "greek": 156,
    "grill": 181,
    "hawaiian": 521,
    "healthy food": 143,
    "ice cream": 233,
    "indian": 148,
    "international": 154,
    "irish": 135,
    "italian": 55,
    "jamaican": 207,
    "japanese": 60,
    "juices": 164,
    "kebab": 178,
    "korean": 67,
    "laotian": 901,
    "latin american": 136,
    "lebanese": 66,
    "mediterranean": 70,
    "mexican": 73,
    "middle eastern": 137,
    "mongolian": 74,
    "moroccan": 147,
    "nepalese": 117,
    "new american": 996,
    "pakistani": 139,
    "patisserie": 183,
    "peruvian": 162,
    "pizza": 82,
    "polish": 219,
    "pub food": 983,
    "ramen": 320,
    "russian": 84,
    "salad": 998,
    "salvadorean": 601,
    "sandwich": 304,
    "seafood": 83,
    "soul food": 461,
    "southern": 471,
    "southwestern": 966,
    "spanish": 89,
    "steak": 141,
    "sushi": 177,
    "swedish": 211,
    "taco": 997,
    "taiwanese": 190,
    "tapas": 179,
    "tea": 163,
    "teriyaki": 964,
    "tex-mex": 150,
    "thai": 95,
    "turkish": 142,
    "vegetarian": 308,
    "vietnamese": 99
};
apiKey = '6ebe4f4724f4745f9cf521042143f3f6';
count = 10; //placeholder value

$('input.autocomplete').autocomplete({
    data: {
        "American": null,
        "African": null,
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
    restaurantData = [];

    // Make sure browser supports this feature
    if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition, getPosFail);
    } else {
        $("#main-content").ready(function(){
            $('#modal3').modal();
            var instance = M.Modal.getInstance($("#modal3"));
            instance.open();
          });
    };
});

function getPosFail() {
    $("#main-content").ready(function(){
        $('#modal2').modal();
        var instance = M.Modal.getInstance($("#modal2"));
        instance.open();
      });
};

// This will get called after getCurrentPosition()
function showPosition(position) {
    // Grab coordinates from the given object
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Call our next function, passing on the coordinates
    zomatoCall(lat, lon);
};

function zomatoCall(lat, lon) {

    //get user input and convert to lowercase
    inputCuisine = $('#cuisine').val().toLowerCase();

    //check that entered cuisine is valid
    if (inputCuisine in cuisineIds) {
        cuisine = cuisineIds[inputCuisine];
    } else {
        $("#check1").attr("style", "display: block");
        return;
    };

    //get radius entered, convert to meters and verify value is numeric
    rad = Math.floor($('#radius').val() / 0.00062137);
    if (!$.isNumeric(rad)) {
        $("#check2").attr("style", "display: block");
        return;
    };

    cuisine = cuisineIds[inputCuisine]; //.syntax doesn't work here
    console.log(inputCuisine, cuisine);
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?apikey=' + apiKey + '&count=' + count + '&lat=' + lat + '&lon=' + lon + '&radius=' + rad + '&cuisines=' + cuisine;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        $("#randomizer").html("");
        $("#winner").html("");
        var newLat = response.restaurants[rand].restaurant.location.latitude;
        var newLon = response.restaurants[rand].restaurant.location.longitude;


        buildRestaurantData(response);
        resultsRandom();
        setTimeout(() => {
            callMap(newLat, newLon);
            winner(response);
          }, 3000);
    }).fail(function() {
        $("#main-content").ready(function(){
            $('#modal1').modal();
            var instance = M.Modal.getInstance($("#modal1"));
            instance.open();
          });
    });
};

function winner(response){
    var res = response.restaurants[rand].restaurant;
    var resName = $("<h5>").text(res.name);
    var resLink = $("<a>").attr("href", res.url);
    $("#winner").append($("<h3>").text("Your Random Choice is:"));
    $("#winner").append(resLink);
    resLink.append(resName);
    var resThumb = $("<img>").attr("src", res.thumb);
    $("#winner").append(resThumb);
    var resTimes = $("<p>").text(res.timings);
    $("#winner").append(resTimes);
    var resRating = $("<p>").text("Average Rating from 0 to 5 is: " + res.user_rating.aggregate_rating);
    $("#winner").append(resRating);
}

function resultsRandom() {
    var randomListEl = $("<div>").attr("class", "collection center");
    $("#randomizer").append(randomListEl);

    for (var i = 0; i < restaurantData.length; i++) {
        var restaurantDataName = (restaurantData[i].name);
        var li = $("<a>");
        li.text(restaurantDataName).attr("class", "collection-item blue-text").attr("href", restaurantData[i].url);
        randomListEl.append(li);
        randomizer();
    };
};

function callMap(newLat, newLon) {
    $("#map").attr("style", "block")
    var myLatLng = new google.maps.LatLng(newLat, newLon);
    var marker = new google.maps.Marker({ position: myLatLng, map: map });
    map = new google.maps.Map(document.getElementById("map"));
    map.setCenter(myLatLng);
    map.setZoom(16);
    marker.setMap(map);
    console.log(newLat, newLon);

    loadSearchButton();
};

function buildRestaurantData(response) {
    $.each(response.restaurants, function (index) {
        //create new object with data to input to google maps API
        var restaurant = {
            name: response.restaurants[index].restaurant.name,
            lat: response.restaurants[index].restaurant.location.latitude,
            lon: response.restaurants[index].restaurant.location.longitude,
            url: response.restaurants[index].restaurant.url
        };
        restaurantData.push(restaurant);
    });
    console.log(restaurantData);
};

function randomizer() {
    //set variables for cycling active class
    var i = 0;
    var j = 0;
    //create interval for cycling through active class
    var randInterval = setInterval(function () {
        $(".collection-item").eq(i).addClass("active");
        if ($(".collection-item").eq(i - 1).hasClass("active")) {
            $(".collection-item").eq(i - 1).removeClass("active");
        };
        //the incrementation below just helps visualization of the restaurant list
        i++;
        if (i >= 11) {
            i = 0;
            j++;
        };
        if (j >= 2) {
            if (i > rand) {
                $(".collection-item").eq(i - 1).removeClass("active");
                clearInterval(randInterval);
                $(".collection-item").eq(rand).addClass("active");
            };
        };
    }, 100);
};

function loadSearchButton() {
    $(".search").remove();
    var newSearch = $("<ul>");
    var newSearchBtn = $("<li>");
    newSearch.attr("id", "nav-mobile");
    newSearch.addClass("left search");
    $("#navBar").append(newSearch);
    newSearchBtn.html('<a href="index.html">Search Again</a>');
    newSearch.append(newSearchBtn);
};
