'use strict';

var $selectCompany = $('.select-company select');
var $showOverlayButton = $('.travel-list button');
var $addTripButton = $('.overlay button');

function getSelectedCompanyName() {
  return $selectCompany.val();
}

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

  $showOverlayButton.prop('disabled', false);
}

$showOverlayButton.on('click', function (event) {
  event.preventDefault();

  var $overlay = $('.overlay');

  $overlay.css('display', 'flex');
});

$addTripButton.on('click', function (event) {
  event.preventDefault();

  var $overlay = $('.overlay');
  var tripName = $('.trip-name', $overlay).val();

  if (tripName !== '') {
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      url: '/trips',
      data: {
        company: getSelectedCompanyName(),
        name: tripName
      }
    }).done(onSuccess);

    function onSuccess(data) {
      $overlay.css('display', 'none');
    }
  }
});
