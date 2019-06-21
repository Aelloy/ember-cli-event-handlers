import { isPresent } from '@ember/utils';
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
    const selector  = config.selector;

    const callback = function() {
      if (!this.get('isDestroying') && !this.get('isDestroyed')) {
        func.call(this, ...arguments);
      }
    }.bind(component);

    if (isPresent(selector)) {
      this.callback = function() {
        const event = arguments[0];
        const matchingChild = event.target.closest(selector);
        if (matchingChild) callback(...arguments);
      }
    } else {
      this.callback = callback;
    }
  }

  callbackParams() {
    return [this.event, this.callback];
  }

  getRoot() {
    switch (this.root) {
    case 'window':
      return window;
    case 'document':
      return document;
    case 'body':
      return document.querySelector('body');
    default:
      return this.component.element;
    }
  }

  getSelector() {
    if (isPresent(this.selector) && !this.bubble) {
      return this.getRoot().querySelector(this.selector);
    } else {
      return this.getRoot();
    }
  }

  on() {
    this.handling = true;
    this.getSelector().addEventListener(...this.callbackParams());
  }

  off() {
    this.getSelector().removeEventListener(...this.callbackParams());
    this.handling = false;
  }
}
