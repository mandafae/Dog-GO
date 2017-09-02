$('.search input[type=submit]').click((e) => {
  e.preventDefault();

// ZOMATO API CALL. WORKS IN BROWSER BUT CAN'T GET LOCATION INFO PULLED INTO THE URL.
//   let searchLocation = $('#location').val();
//   let locationType = "city";
//   let locationId = 1;
//   $.ajax({
//     url: (`https://developers.zomato.com/api/v2.1/locations?query=${searchLocation}`),
//     // ('https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&q=pet-friendly=1'),
//     headers: {'user-key': '733d7e1ab9b34bd7a2e074d63aa4bef1'},
//     dataType: 'json'
//   }).done(function(data) {
//     locationType = data.location_suggestions[0].entity_type;
//     locationId = data.location_suggestions[0].entity_id;
//   })
//   $.ajax({
//     url:  ('https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&q=pet-friendly=1'),
//     headers: {'user-key': '733d7e1ab9b34bd7a2e074d63aa4bef1'},
//     dataType: 'json'
//   }).done(function(data) {
//     console.log("Location Type", locationType)
//     console.log("Location ID", locationId)
//     console.log(data);
//   })
// });
//
  // YELP API CALL - WORKS IN POSTMAN, NOT IN BROWSER. NEED BACKEND?
  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.yelp.com/v3/businesses/search?term=dog%20friendly&location=78757",
  //   "method": "GET",
  //   "headers": {
  //     "authorization": "Bearer 80LIgTKphcU7oWrMtt4e9TahnIrn-P3sMkhDw1B3CW25GdSHZB4-PU-dM_hRIwx3AzT3SUPoXo0fRtNadtudHoxBrjGTZr_Wgavv6fqQ5ZRoH79m9HaXPBjrnX-pWXYx",
  //     "cache-control": "no-cache",
  //     "postman-token": "3f23d8c3-ce48-a224-50c0-14b9094948fc"
  //   }
  // }
  //
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });
  //
  // GOOGLE MAPS API CALL. GETTING ORIGIN HEADER ERROR MESSAGE.
  // $.ajax({
  //   'url':'https://maps.googleapis.com/maps/api/place/textsearch/json?query=austin+tx+dog+friendly&key=AIzaSyBy58SvGAqnW27U4EY7Mfq52wjAjy9YkEU',
  //   'dataType': 'json'
  // }).done(function(data) {
  //   console.log(data);
  // })
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query=austin%20tx%20dog%20friendly&type=restaurant&key=AIzaSyBy58SvGAqnW27U4EY7Mfq52wjAjy9YkEU",
  "method": "GET",
  "dataType": "jsonp",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0e85922d-01b7-e758-457c-b5071b1b4c96"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
});
