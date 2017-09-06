let searchText = window.location.search.replace(/\?location=/, '');
// Define the settings for the API call
var settings = {
  "async": true,
  "crossDomain": true,
  "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dog%20friendly&categories=restaurants,bars&open_now=true&sort_by=distance&limit=10&location=${searchText}`,
  "method": "GET",
  "headers": {
    "authorization": "Bearer 80LIgTKphcU7oWrMtt4e9TahnIrn-P3sMkhDw1B3CW25GdSHZB4-PU-dM_hRIwx3AzT3SUPoXo0fRtNadtudHoxBrjGTZr_Wgavv6fqQ5ZRoH79m9HaXPBjrnX-pWXYx",
    "cache-control": "no-cache",
    "postman-token": "3f23d8c3-ce48-a224-50c0-14b9094948fc"
  }
}

// Use AJAX to perform API call
$.ajax(settings).done(function (response) {
  let results = response.businesses;
  console.log(response);

  // Display results
  results.forEach(function(business) {
    // Create each business result div
    let businessInfo = document.createElement('div');
    let businessName = business.name;
    let businessAddress = `${business.location.display_address[0]}, ${business.location.display_address[1]}`;
    businessInfo.innerHTML = `<h4>${businessName}</h4><p>${businessAddress}</p>`;
    $(businessInfo).addClass('result');

    // Create each details div
    let details = document.createElement('div');
    let businessImg = business.image_url;
    let category = business.categories[0].title;
    let phone = business.display_phone;
    let price = business.price;
    let geo = `{lat: ${business.coordinates.latitude}, lng: ${business.coordinates.longitude}}`;
    console.log("geo:",geo);
    let mapDiv = document.createElement('div');
    $(mapDiv).attr('id', 'map');
    details.innerHTML = `<img src=${businessImg} style='width: 50%; height: 50%'><p>Category: ${category}<br>Phone number: ${phone}<br>Average price: ${price}</p>`;
    $(details).addClass('detail');

    // Google Maps stuff
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: geo,
          zoom: 8
        });
      };
      $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyDY-gNEsO3s_1BLdXrFsFPryirfO7q7AwY&callback=initMap'
      }).done(function(result) {
        console.log(result);
      });

      // Add divs to DOM
      $(businessInfo).append(details);
      // Hide details
      $(details).hide();
      $('.searchResults').append(businessInfo);
      // Add hover event to toggle details
      $(businessInfo).hover(function() {
        $(details).toggle();
      })
      })

  // Draw borders
  drawLeftBorder();
  drawRightBorder();
})
// Error handling
.fail(function() {
  let errorMessage = document.createElement('p');
  errorMessage.innerText = "We're sorry. Your search did not return any results.";
  $('.searchResults').append(errorMessage);
});
