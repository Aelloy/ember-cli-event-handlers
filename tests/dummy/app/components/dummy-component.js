import Ember from 'ember';
import { handle, handleManual } from 'ember-cli-event-handlers';

export default Ember.Component.extend({
  classNames: ['dummy-component'],

  scrolled: 0,

  onResize: handle('resize', 'window', function() {
    this.incrementProperty('resized');
  }),

  onClick: handleManual('click', '.button', function() {
    this.incrementProperty('clicked');
  }),

  onScroll: handle('scroll', '.scrollable', function() {
    this.incrementProperty('scrolled');
  }),

  onBackground: handle('visibilitychange', 'document', function() {
    this.set('visibility', document.hidden ? 'ivisible' : 'visible');
  }),

  toggleHandling: Ember.observer('handling', function() {
    if (this.onClick.handling) {
      this.onClick.off();
    } else {
      this.onClick.on();
    }
  })
});
