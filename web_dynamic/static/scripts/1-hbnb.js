#!/usr/bin/node
/* Listens for changes on each input (checkbox):
 * adds Amenity_id to a dict/list if checked or removes it if unchecked
 * then updates a <h4> tag with checked Amenities
 * REQUIREMENTS: must be exceuted ONLY when the DOM is loaded */
const $ = window.$;
$(document).ready(function () {
  //  const selected = {};
  $('input[type=checkbox]').on('click', function () {
    // alert(`checkbox clicked -> ${$(this).is(':checked')}`);
    const all = $('input[type=checkbox]:checked');
    const selected = {};
    $.each(all, function (i, item) { selected[item.dataset.id] = item.dataset.name; });
    $('DIV.amenities h4').text(Object.values(selected));
    // alert(`selected -> ${Object.values(selected)} & h4: ${$('DIV.amenities h4').text()}`);
    // $('DIV.amenities h4').text()
  });
});
