import $ from 'jquery';
import Controller from '@ember/controller'

export default Controller.extend({
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
      $(window).trigger('resize');
    }
  }
});