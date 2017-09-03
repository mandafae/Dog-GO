$('.search input[type=submit]').click((e) => {
  e.preventDefault();

/* ZOMATO API CALL. Decided not to use when I got Yelp API call working but keeping the code in case I need it. */
//   let searchText = $('#location').val();
//   let locationType = "city";
//   let locationId = 1;
//   // Perform API call to search locations and get id
//   $.ajax({
//     url: (`https://developers.zomato.com/api/v2.1/locations?query=${searchText}`),
//     // ('https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&q=pet-friendly=1'),
//     headers: {'user-key': '733d7e1ab9b34bd7a2e074d63aa4bef1'},
//     dataType: 'json'
//   }).done(function(data) {
//     // Display results of location search
//     // When user makes a selection, set it as the location to search and take user to results page
//     let locationResults = document.createElement('div');
//     document.getElementsByClassName('searchForm')[0].append(locationResults);
//     let friendlyText = document.createElement('p');
//     friendlyText.innerText = "Please select a location from the list below:"
//     locationResults.append(friendlyText);
//     let suggestions = data.location_suggestions;
//     for (let i=0; i<suggestions.length; i++) {
//       let location = document.createElement('p');
//       location.innerHTML = `${suggestions[i].title}`;
//       locationResults.append(location);
//       $(location).click(() => {
//         locationType = data.location_suggestions[0].entity_type;
//         locationId = data.location_suggestions[0].entity_id;
//         //window.location.href= 'results.html';
//         $.ajax({
//           url:  (`https://developers.zomato.com/api/v2.1/search?entity_id=${locationId}&entity_type=${locationType}&q=pet-friendly=1`),
//           headers: {'user-key': '733d7e1ab9b34bd7a2e074d63aa4bef1'},
//           dataType: 'json'
//         }).done(function(data) {
//           console.log(locationType)
//           console.log(locationId);
//           console.log(data);
//           for (let i=0; i<data.restaurants.length; i++) {
//             let result = document.createElement('div');
//             result.innerHTML = `<p>${data.restaurants[i].restaurant.name}<br>
//                                     ${data.restaurants[i].restaurant.location.locality}<br>
//                                     ${data.restaurants[i].restaurant.cuisines}</p>`;
//             locationResults.append(result);
//         }
//         });
//       });
//     };
//   })
// });

//
  // YELP API CALL
  // Get input text to use for search
  let searchText = $('#location').val();
  // Define the settings for the API call
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dog%20friendly&categories=restaurants,bars&open_now=true&sort_by=distance&location=${searchText}`,
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
    // Display results
    results.forEach(function(business) {
      let businessInfo = document.createElement('div');
      let businessName = business.name;
      let businessImg = business.image_url;
      let businessAddress = `${business.location.display_address[0]}, ${business.location.display_address[1]}`;
      businessInfo.innerHTML = `<img src=${businessImg} style='width: 10%; height: 10%'><h4>${businessName}</h4><p>${businessAddress}</p>`;
      $('.searchForm').append(businessInfo);
    })
  });
});

// Draw divs for decorative left border
function drawLeftBorder (){
  let leftBorderContainer = document.getElementsByClassName('leftBorder')[0];
  for (let i=0; i<4; i++) {
    let circle = document.createElement('div');
    circle.className = "leftBorderCircles";
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
  for (let i=0; i<4; i++) {
    let circle = document.createElement('div');
    circle.className = "rightBorderCircles";
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
