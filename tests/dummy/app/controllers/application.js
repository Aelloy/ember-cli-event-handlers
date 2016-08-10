import Ember from 'ember';

export default Ember.Controller.extend({
  show: true,
  handling: false,
  clicked: 0,
  resized: 0,
  actions: {
    toggleShow() {
      this.toggleProperty('show');
    },
    toggleHandling() {
      this.toggleProperty('handling');
    },
    triggerResize() {
      Ember.$(window).trigger('resize');
    }
  }
});