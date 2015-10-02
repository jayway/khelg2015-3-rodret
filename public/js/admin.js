'use strict';

var $selectCompany = $('.select-company select');
var $showOverlayButton = $('.travel-list button');
var $addTripButton = $('.overlay button');

function getSelectedCompanyName() {
  return $selectCompany.val();
}

function refreshCompanyData(companyName) {
  var endPoint = '/trips/company/' + companyName;

  $.get(endPoint, onSuccess);

  function onSuccess(data) {
    updateTravelList(data);
  }
}

function updateTravelList(data) {
  var $list = $('.travel-list ul');

  $list.empty();

  data.forEach(function (trip) {
    $('<li><a href="#">' + trip.name +'</a></li>').appendTo($list);
  });

  $showOverlayButton.prop('disabled', false);
}

$selectCompany.on('change', function (event) {
  event.preventDefault();

  var companyName = getSelectedCompanyName();

  refreshCompanyData(companyName);
});

$showOverlayButton.on('click', function (event) {
  event.preventDefault();

  var $overlay = $('.overlay');

  $overlay.css('display', 'flex');
});

$addTripButton.on('click', function (event) {
  event.preventDefault();

  var $overlay = $('.overlay');
  var tripName = $('.trip-name', $overlay).val();
  var data = JSON.stringify({
    company: getSelectedCompanyName(),
    name: tripName
  });

  if (tripName !== '') {
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url: '/trips',
      data: data,
      complete: onSuccess
    });

    function onSuccess(data) {
      $overlay.css('display', 'none');

      var companyName = getSelectedCompanyName();
      refreshCompanyData(companyName);
    }
  }
});
