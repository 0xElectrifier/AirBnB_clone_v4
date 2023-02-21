#!/usr/bin/node
/* Listens for changes on each input (checkbox):
 * adds Amenity_id to a dict/list if checked or removes it if unchecked
 * then updates a <h4> tag with cheicked Amenities
 * REQUIREMENTS: must be exceuted iONLY when the DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
  const selected = {};
  document.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
      // alert(`${e.target.dataset.name} checked!`)
        selected[e.target.dataset.id] = e.target.dataset.name;
      } else {
        delete selected[e.target.dataset.id];
      }
    }

    // alert(`selected: ${Object.values(selected)}`)
    document.querySelector('.amenities h4').innerHTML = Object.values(selected);
  });
});
