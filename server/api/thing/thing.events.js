/**
 * Thing model events
 */


const EventEmitter = require('events').EventEmitter;
const Thing = require('../../sqldb').Thing;

const ThingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThingEvents.setMaxListeners(0);

// Model events
const events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove',
};

// Register the event emitter to the model events
for (const e in events) {
  const event = events[e];
  Thing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ThingEvents.emit(`${event}:${doc.id}`, doc);
    ThingEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ThingEvents;
