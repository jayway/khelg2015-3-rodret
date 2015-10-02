'use strict';

var $selectCompany = $('.select-company select');

$selectCompany.on('change', function (event) {
  event.preventDefault();

  var value = event.target.value;
  var endPoint = '/trips/company/' + value;

  $.getJSON(endPoint, onSuccess);

  function onSuccess(data) {
    console.log(data);
  }
});
