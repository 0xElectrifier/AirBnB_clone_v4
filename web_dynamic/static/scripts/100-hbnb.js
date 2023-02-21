#!/usr/bin/node
/* Makes a request to a URL and displays the data (Place objects) fetched in article tags */

const $ = window.$;
$(document).ready(function () {
  $('button').on('click', function () {
    const allStates = $('DIV.locations h2 input[type=checkbox]:checked');
    const allCities = $('DIV.locations ul ul li input[type=checkbox]:checked');
    const allAmenities = $('DIV.amenities input[type=checkbox]:checked');
    // get a list of id's
    const states = [];
    const cities = [];
    const amenities = [];
    $.each(allAmenities, function (idx, amenity) { amenities.push(amenity.dataset.id); });
    $.each(allStates, function (idx, state) { states.push(state.dataset.id); });
    $.each(allCities, function (idx, city) { cities.push(city.dataset.id); });
    $.post('http://localhost:5000/api/v1/places_search', { amenities: amenities, states: states, cities: cities }, function (data) {
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
