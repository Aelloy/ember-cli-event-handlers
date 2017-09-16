import Ember from 'ember';
import ENV from '../config/environment';
import EventHandlersMixin from 'ember-cli-event-handlers/mixins/event-handlers';

export default {
  name: 'ember-cli-event-handlers',
  initialize: function(registry) {
    const config = ENV['ember-cli-event-handlers'] || {};

    if (config.autoApply) {
      Ember.Component.reopen(EventHandlersMixin);
    }
  }
};
