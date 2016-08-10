import Ember from 'ember';
const { assert, isPresent } = Ember;

export default function HandlerProperty() {
  var args = [...arguments];
  assert("Expects 2 or 3 arguments: event, selector (optional) and callback", args.length > 1 && args.length < 4);

  this.func = args.pop();
  assert("Last argument must be a callback function", typeof this.func === 'function');
  
  this.event = args.shift();
  assert("Event argument must be a string", typeof this.event === 'string');
  
  this.element = args.pop();
  assert("Element argument must be a string or undefined", ['string', 'undefined'].includes(typeof this.element));
}

HandlerProperty.prototype.initCallback = function(that) {
  var func = this.func;
  this.callback = function(){
    if (!this.get('isDestroying') && !this.get('isDestroyed')) {
      func.call(this, ...arguments);
    }
  }.bind(that);
};

HandlerProperty.prototype.callbackParams = function() {
  if (isPresent(this.element)) {
    return [this.event, this.element, this.callback];
  } else {
    return [this.event, this.callback];
  }
};

HandlerProperty.prototype.global = function() {
  return !isPresent(this.element);
};