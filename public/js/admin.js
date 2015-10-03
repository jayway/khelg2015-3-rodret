'use strict';

var $selectCompany = $('.select-company select');
var $showOverlayButton = $('.travel-list button');
var $addTripButton = $('.overlay button');
var $overlay = $('.overlay');

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
    var $listItem = $('<li>');

    $('<a href="/admin/trip/' + trip.name + '">')
      .text(trip.name)
      .appendTo($listItem);

    $listItem.appendTo($list);
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

  $overlay.find('input').val('');
  $overlay.css('display', 'flex');
});

$addTripButton.on('click', function (event) {
  event.preventDefault();

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
