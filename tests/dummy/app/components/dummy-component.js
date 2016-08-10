import Ember from 'ember';
import { handle } from 'ember-cli-event-handlers';

export default Ember.Component.extend({
  classNames: ['dummy-component'],

  window_prop: handle('resize', function() {
    this.incrementProperty('resized');
  }),
  
  internal_prop: handle('click', '.button', function() {
    this.incrementProperty('clicked');
  })
});