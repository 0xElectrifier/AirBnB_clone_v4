#!/usr/bin/node
/* Makes a request to a URL and displays the data (Place objects) fetched in article tags */

const $ = window.$;
$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
 	alert('data ' + data.length)
      $.each(data, function (idx, place) {
      // alert('data' + place.name)
        $('SECTION.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
      });
    }
  });
});
