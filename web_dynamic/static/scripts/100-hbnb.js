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
          // alert('data' + place.name)
          $('SECTION.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
        });
      }
    });
  });
});
