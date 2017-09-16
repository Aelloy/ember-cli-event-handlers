import Ember from 'ember';
const { isPresent } = Ember;
const noBubbleEvents = ['scroll', 'focus', 'blur', 'load', 'unload'];

export default class HandlerProperty {

  constructor(config, component) {
    this.event      = config.event;
    this.root       = config.root;
    this.selector   = config.selector;
    this.auto       = config.auto;
    this.component  = component;
    this.handling   = false;
    this.bubble     = !noBubbleEvents.includes(this.event);

    const func      = config.func;
    this.callback = function() {
      if (!this.get('isDestroying') && !this.get('isDestroyed')) {
        func.call(this, ...arguments);
      }
    }.bind(component);
  }

  callbackParams() {
    if (isPresent(this.selector) && this.bubble) {
      return [this.event, this.selector, this.callback];
    } else {
      return [this.event, this.callback];
    }
  }

  getRoot() {
    switch (this.root) {
    case 'window':
      return Ember.$(window);
    case 'document':
      return Ember.$(document);
    case 'body':
      return Ember.$('body');
    default:
      return this.component.$();
    }
  }

  getSelector() {
    if (isPresent(this.selector) && !this.bubble) {
      return this.getRoot().find(this.selector);
    } else {
      return this.getRoot();
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
