$(function() {
  var socket = io.connect();
  socket.on('travel-event:added', function (data) {
    console.log('added', data);
    var event = data[0];
    var html =
      '<li>' +
      '<img class="photo" src="' + event.photo + '">' +
      '<article>' +
      '<img class="user-icon" src="https://randomuser.me/api/portraits/thumb/men/4.jpg" />' +
      '<div><h3>' + event.title + '</h3><p>' + event.text +'</p>' +
      '<p class="time">' + event.timestamp + '</p></div>' +
      '</article></li>';
    $('#event-list').prepend(html)
  });

  $('body').on('submit', '#add-event', function(event) {
    console.log(event);
    event.preventDefault();
    var formData = new FormData();
    formData.append('title', $('.title').val());
    formData.append('text', $('.text').val());
    formData.append('timestamp', $('.timestamp').val());
    var photoInput = document.querySelector('.photo-input');
    console.log('photo', photoInput);
    formData.append('photo', photoInput.files[0], 'photo.jpg');
    var xhr = new XMLHttpRequest;
    xhr.open('POST', $(this).attr("action"), true);
    xhr.send(formData);
    window.location.hash = '#events';
  });

});
