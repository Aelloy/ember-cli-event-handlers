import Ember from 'ember';
import HandlerProperty from '../handler-property';
import HandlerConfig from '../handler-config';

export default Ember.Mixin.create({

  _bindCallbacks(handler) {
    this.on('didInsertElement', function(){
      handler.on();
    });
    
    this.on('willDestroyElement', function(){
      handler.off();
    });    
  },

  init() {
    this._super(...arguments);
    for (var handler in this) {
      if (this[handler] instanceof HandlerConfig) {
        this[handler] = new HandlerProperty(this[handler], this);
        if (this[handler].auto) {
          this._bindCallbacks(this[handler]);
        }
      }
    }
  }
});
