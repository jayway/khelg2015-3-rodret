'use strict';

var $overlay = $('.overlay');
var $showOverlayButton = $('.members button');
var $addMemberButton = $('.overlay button');
var members = [];

$showOverlayButton.on('click', function (event) {
  event.preventDefault();

  $overlay.find('input').val('');
  $overlay.css('display', 'flex');
});

$addMemberButton.on('click', function (event) {
  event.preventDefault();

  var name = $overlay.find('input').val();

  if (name !== '') {
    var $list = $('.members ul');

    $('<li>').text(name).appendTo($list);
    $overlay.css('display', 'none');
  }
});
