import Ember from 'ember';
const { isPresent } = Ember;

export default class HandlerProperty {
  
  constructor(config, component) {
    this.event      = config.event;
    this.root       = config.root;
    this.selector   = config.selector;      
    this.auto       = config.auto;
    this.component  = component;
    this.handling   = false;

    let func      = config.func;
    this.callback = function() {
      if (!this.get('isDestroying') && !this.get('isDestroyed')) {
        func.call(this, ...arguments);
      }
    }.bind(component);
  }

  callbackParams() {
    if (isPresent(this.selector)) {
      return [this.event, this.selector, this.callback];
    } else {
      return [this.event, this.callback];
    }
  }
  
  getSelector() {
    switch (this.root) {
    case 'window':
      return Ember.$(window);
    case 'body':
      return Ember.$('body');
    default:
      return this.component.$();
    }
  }
  
  on() {
    this.handling = true;
    this.getSelector().on(...this.callbackParams());
  }
  
  off() {
    this.getSelector().off(...this.callbackParams());    
    this.handling = false;
  }
}
