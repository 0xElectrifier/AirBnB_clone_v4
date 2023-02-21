#!/usr/bin/node
/* Makes a request to a URL and changes the class of div (id = api_status)
 * based on the response status */

const $ = window.$;
$(document).ready(function () {
  $.get('http://localhost:5000/api/v1/status', function (data) {
    if (data.status === 'OK') { $('DIV#api_status').addClass('available'); } else { $('DIV#api_status').removeClass('available'); }
  });
});
