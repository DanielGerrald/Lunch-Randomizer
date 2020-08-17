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

$(document).ready( function() {
    
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