var socket = io.connect('http://localhost');
socket.on('traveller-event', function (data) {
  console.log(data);
});

socket.emit('traveller-event', {
  travelId: 'toledo',
  travellerId: 'Thomas Dagsberg',
  title: 'Awesome Cow',
  text: 'Just saw an awesome cow at the bull fight in Madrid',
  timestamp: (new Date()).toISOString(),
  coordinates {
    lat: 123,
    lon: 234
  },
  photo: 'http://www.windsorstar.com/news/cms/binary/3062417.jpg?size=640x420'
});

