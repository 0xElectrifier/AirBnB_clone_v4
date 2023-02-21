#!/usr/bin/node
/* Listens for changes on each input (checkbox):
 * adds Amenity_id to a dict/list if checked or removes it if unchecked
 * then updates a <h4> tag with checked Amenities
 * REQUIREMENTS: must be exceuted ONLY when the DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
  const selected = {};
  document.addEventListener('select', function (e) {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) { selected[(e.target.dataset.id)] = e.target.dataset.name; } else { delete selected[e.target.dataset.id]; }
    }
    const h4 = document.querySelector('.amenities h4');
    let str = '';
    for (const name of Object.values(selected)) {
      str += name;
    }
    h4.innerHTML = str;
  });
});
