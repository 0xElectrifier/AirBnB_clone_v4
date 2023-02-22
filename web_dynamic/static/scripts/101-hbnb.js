#!/usr/bin/node
/* Makes a request to a URL and displays the data (Place objects) fetched in article tags */

const $ = window.$;
$(document).ready(function () {
  $('input[type=checkbox]').on('click', function () {
    $('SECTION.places').empty();
    const allStates = $('DIV.locations h2 input[type=checkbox]:checked');
    const allCities = $('DIV.locations ul ul li input[type=checkbox]:checked');
    const allAmenities = $('DIV.amenities input[type=checkbox]:checked');
    // get a list of the amenity id's
    const states = [];
    const cities = [];
    const amenities = [];
    $.each(allStates, function (idx, state) { states.push(state.dataset.id); });
    $.each(allCities, function (idx, city) { cities.push(city.dataset.id); });
    $.each(allAmenities, function (idx, amenity) { amenities.push(amenity.dataset.id); });
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: amenities, states: states, cities: cities }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        // alert('data length' + data.length);
        $.each(data, function (idx, place) {
          alert('reviews' + place.review);
          $('SECTION.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
          $('article').append('<div class="reviews"><h2><span id="show_reviews" data-id=' + place.id + '>show</span>' + (place.reviews).length + 'Reviews</h2><ul class="reviews_list"></ul></div>');
          $.each(place.reviews, function (idx, review) {
            $('UL.reviews_list').append('<li><h3>' + review.user + '</h3><p>' + review.text + '</p></li>');
          });
        });
      }
    });
  });
  $('SPAN#show_reviews').on('click', function () {
    if ($(this).text() === 'show') { $(this).text('hide'); /* check if ul is empty, if so append place.reviews (fetch reviews API) */ } else { $(this).text('show'); $(this).empty(); }
  });
});
