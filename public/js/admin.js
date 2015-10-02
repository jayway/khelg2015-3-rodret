'use strict';

var $selectCompany = $('.select-company select');
var $addTripButton = $('.travel-list button');

$selectCompany.on('change', function (event) {
  event.preventDefault();

  var value = event.target.value;
  var endPoint = '/trips/company/' + value;

  $.get(endPoint, onSuccess);

  function onSuccess(data) {
    updateTravelList(data);
  }
});

function updateTravelList(data) {
  var $list = $('.travel-list ul');

  $list.empty();

  data.forEach(function (trip) {
    $('<li><a href="#">' + trip.name +'</a></li>').appendTo($list);
  });

  $addTripButton.prop('disabled', false);
}

$addTripButton.on('click', function (event) {
  event.preventDefault();

  $('.overlay').show();
});
