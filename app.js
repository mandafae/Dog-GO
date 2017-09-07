// Draw divs for decorative left border
function drawLeftBorder (){
  let leftBorderContainer = document.getElementsByClassName('leftBorder')[0];
  let windowHeight = $(window).height();
  for (let i=0; i<(windowHeight/200); i++) {
    let circle = document.createElement('div');
    $(circle).addClass("leftBorderCircles");
    if (i % 2 === 0) {
      circle.style.backgroundColor = "#A4D555";
      leftBorderContainer.append(circle);
    } else {
      circle.style.backgroundColor = "#4CDEF5";
      leftBorderContainer.append(circle);
    }
  };
};
drawLeftBorder();

// Draw divs for decorative right border
function drawRightBorder (){
  let rightBorderContainer = document.getElementsByClassName('rightBorder')[0];
  let windowHeight = $(window).height();
  for (let i=0; i<(windowHeight/200); i++) {
    let circle = document.createElement('div');
    $(circle).addClass("rightBorderCircles");
    if (i % 2 === 0) {
      circle.style.backgroundColor = "#FF5992";
      rightBorderContainer.append(circle);
    } else {
      circle.style.backgroundColor = "#A4D555";
      rightBorderContainer.append(circle);
    }
  };
};
drawRightBorder();

searchText = '';

// Create function to initialize map
function initMap(business, latlng) {
  let directionsDisplay = new google.maps.DirectionsRenderer();
  let location = latlng;
  let map = new google.maps.Map(document.getElementById(business), {
    center: location,
    zoom: 15
  });
  directionsDisplay.setMap(map);

  // Set origin, destination, and travel mode for route calculation
  let start = window.searchText;
  let end = latlng;
  let request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };

  // Pass directions settings to the Google directions service
  let directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      // Display the route
      directionsDisplay.setDirections(result);
    }
  });
};

// Add click event for search
$('button').click((e) => {
  e.preventDefault();
  // Hide search form and photo
  $('.searchForm').hide();
  $('.photo').hide();

  // Get input text to use for search
  window.searchText = $('#location').val();

  // Define the settings for the API call
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dog+friendly&categories=restaurants,bars&open_now=true&sort_by=distance&location=${window.searchText}`,
    "method": "GET",
    "headers": {
      "authorization": "Bearer 80LIgTKphcU7oWrMtt4e9TahnIrn-P3sMkhDw1B3CW25GdSHZB4-PU-dM_hRIwx3AzT3SUPoXo0fRtNadtudHoxBrjGTZr_Wgavv6fqQ5ZRoH79m9HaXPBjrnX-pWXYx",
      "cache-control": "no-cache",
      "postman-token": "3f23d8c3-ce48-a224-50c0-14b9094948fc"
    }
  }

  // Use AJAX to perform Yelp API call
  $.ajax(settings).done(function (response) {
    let results = response.businesses;

    // Create div to hold all search results
    let resultsDiv = document.createElement('div');
    $(resultsDiv).addClass('searchResults');
    $('main').append(resultsDiv);

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
      let geo = {lat: business.coordinates.latitude, lng: business.coordinates.longitude};
      let mapDiv = document.createElement('div');
      details.innerHTML = `<img src=${businessImg} style='width: auto; height: auto; max-width: 150px; max-height: 100px'><p>Category: ${category}<br>Phone number: ${phone}<br>Average price: ${price}</p>`;
      $(details).addClass('detail');
      $(mapDiv).attr({id: businessName, class: 'map'});

      // Add map div to details
      $(details).append(mapDiv);

      // Add divs to DOM
      $(businessInfo).append(details);
      // Hide details
      $(details).hide();
      $('.searchResults').append(businessInfo);
      // Add hover event to toggle details
      $(businessInfo).hover(function() {
        $(details).toggle();
        // Call map function to display map
        initMap(businessName, geo);
      })
    })

    // Re-draw borders based on length of content in search results
    drawLeftBorder();
    drawRightBorder();
  })
  // Error handling
  .fail(function() {
    let errorMessage = document.createElement('p');
    errorMessage.innerText = "We're sorry. Your search did not return any results.";
    $('.searchResults').append(errorMessage);
  });
});

// Reset search when user clicks on logo
$('#logo').click((e) => {
  e.preventDefault();
  $('#location').val('');
  $('.searchResults').remove();
  window.searchText = '';
  $('.searchForm').show();
  $('.photo').show();
})
