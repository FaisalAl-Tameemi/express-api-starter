/**
 * Broadcast updates to client when the model changes
 */


const ThingEvents = require('./thing.events');

// Model events to emit
const events = ['save', 'remove'];

exports.register = function (socket) {
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    const event = events[i];
    const listener = createListener(`thing:${event}`, socket);

    ThingEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};


function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    ThingEvents.removeListener(event, listener);
  };
}
