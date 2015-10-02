$(function() {
  var socket = io.connect();
  socket.on('travel-event:added', function (data) {
    console.log('added', data);
  });

  $('#add-event').submit(function(event) {
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
    // $.post($(this).attr("action"), formData, function(data) {
    //   alert(data);
    // });
  });

  // socket.emit('travel-event', {
  //   travelId: 'toledo',
  //   travellerId: 'Thomas Dagsberg',
  //   title: 'Awesome Cow',
  //   text: 'Just saw an awesome cow at the bull fight in Madrid',
  //   timestamp: (new Date()).toISOString(),
  //   coordinates: {
  //     lat: 123,
  //     lon: 234
  //   },
  //   photo: 'http://www.windsorstar.com/news/cms/binary/3062417.jpg?size=640x420'
  // });
});
