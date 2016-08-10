import Ember from 'ember';
import HandlerProperty from '../handler-property';

export default Ember.Mixin.create({

  _getSelector(handler) {
    return handler.global() ? Ember.$(window) : this.$();
  },
  
  _bindCallbacks(handler) {
    this.on('didInsertElement', function(){
      this._getSelector(handler).on(...handler.callbackParams());
    }.bind(this));
    
    this.on('willDestroyElement', function(){
      this._getSelector(handler).off(...handler.callbackParams());
    }.bind(this));    
  },

  init() {
    this._super(...arguments);
    for (var prop in this) {
      if (this[prop] instanceof HandlerProperty) {
        var handler = this[prop];
        handler.initCallback(this);
        this._bindCallbacks(handler);
      }
    }
  }
});
