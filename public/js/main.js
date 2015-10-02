$(function() {
  var socket = io.connect();
  socket.on('travel-event:added', function (data) {
    console.log('added', data);
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
