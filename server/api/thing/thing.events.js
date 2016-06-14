/**
 * Thing model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Thing = require('../../sqldb').Thing;
var ThingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThingEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Thing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    
    ThingEvents.emit(event + ':' + doc.id, doc);
    ThingEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ThingEvents;
