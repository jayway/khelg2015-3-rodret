$(function() {
  var socket = io.connect();
  socket.on('travel-event:added', function (data) {
    console.log('added', data);
  });

  $('body').on('submit', '#add-event', function(event) {
    console.log(event);
    event.preventDefault();
    var formData = new FormData();
    formData.append('title', $('.title').val());
    formData.append('text', $('.text').val());
    formData.append('timestamp', $('.timestamp').val());
    var photoInput = document.querySelector('.photo');
    console.log('photo', photoInput);
    formData.append('photo', photoInput.files[0], 'photo.jpg');
    var xhr = new XMLHttpRequest;
    xhr.open('POST', $(this).attr("action"), true);
    xhr.send(formData);
    window.location.hash = '#events';
  });

});
