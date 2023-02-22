#!/usr/bin/node
/* Makes a request to a URL and displays the data (Place objects) fetched in article tags */

const $ = window.$;
$(document).ready(function () {
  $('button').on('click', function () {
    const checked = $('input[type=checkbox]:checked');
    // get a list of id's
    const selected = [];
    $.each(checked, function (idx, amenity) { selected.push(amenity.dataset.id); });
    $.post('http://localhost:5001/api/v1/places_search', { amenities: selected }, function (data) {
      $.each(data, function (idx, place) {
        const article = document.createElement('article');

        const name = $('<h2></h2>').text(place.name);
        const priceDiv = $('<div></div>').text('$' + place.price_by_night);
        priceDiv.addClass('price_by_night');
        const titleDiv = $('<div></div>').append(name, priceDiv);
        titleDiv.addClass('title_box');

        const guests = $('<div></div>').text(place.max_guest + 'Guest');
        guests.addClass('max_guest');
        const rooms = $('<div></div>').text(place.number_rooms + 'Bedroom(s)');
        rooms.addClass('number_rooms');
        const bathRooms = $('<div></div>').text(place.number_bathrooms + 'Bathroom(s)');
        bathRooms.addClass('number_bathrooms');
        const description = $('<div></div>').text(place.description);
        description.addClass('description');
        const information = $('<div></div>').addClass('information');
        information.append(guests, rooms, bathRooms, description);

        article.append(titleDiv, information);
        $('SECTION.places').append(article);
      });
    });
  });
});
