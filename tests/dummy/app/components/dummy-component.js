import Ember from 'ember';
import { handle, handleManual } from 'ember-cli-event-handlers';

export default Ember.Component.extend({
  classNames: ['dummy-component'],

  onResize: handle('resize', 'window', function() {
    this.incrementProperty('resized');
  }),

  onClick: handleManual('click', '.button', function() {
    this.incrementProperty('clicked');
  }),
  
  toggleHandling: Ember.observer('handling', function() {
    if (this.onClick.handling) {
      this.onClick.off();
    } else {
      this.onClick.on();
    }
  })
});