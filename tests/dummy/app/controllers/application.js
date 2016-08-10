import Ember from 'ember';

export default Ember.Controller.extend({
  show: true,
  clicked: 0,
  resized: 0,
  actions: {
    toggleShow() {
      this.toggleProperty('show');
    }
  }
});