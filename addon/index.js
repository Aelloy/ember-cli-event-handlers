import EventHandlersMixin from './mixins/event-handlers';
import HandlerConfig from './handler-config';

var handle = function() {
  return new HandlerConfig(...arguments);
};

var handleManual = function() {
  return new HandlerConfig(...arguments).setManual();
};

export {
  handle,
  handleManual,
  EventHandlersMixin
};
