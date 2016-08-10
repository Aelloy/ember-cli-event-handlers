import Ember from 'ember';
import HandlerProperty from 'ember-cli-event-handlers/handler-property';
import { module, test } from 'qunit';

module('Unit | HandlerProperty');

test('configuration', function(assert) {
  assert.throws(
    () => new HandlerProperty(),
    /Expects 2 or 3 arguments/,
    'Expect an error when not enough args provided'
  );

  assert.throws(
    () => new HandlerProperty('resize', 'other bullshit'),
    /Last argument must be a callback/,
    'Expect an error when last argument is not a function'
  );
  
  assert.throws(
    () => new HandlerProperty('resize', window, function() {}),
    /Element argument must be a string or undefined/,
    'Expect an error when optional element argument is not a string'
  );

  assert.ok(new HandlerProperty('resize', function() {}) instanceof HandlerProperty, "Property is an instanceof HandlerProperty");
});

test('callback initialization', function(assert) {
  var obj = Ember.Object.create({
    counter: 0,
    prop: new HandlerProperty('event', function(){
      this.incrementProperty('counter');
    })
  });
  obj.prop.initCallback(obj);
  
  obj.prop.callback();
  assert.equal(obj.counter, 1, "callback worked");
  
  obj.set('isDestroying', true);
  obj.prop.callback();
  assert.equal(obj.counter, 1, "callback didn't work, cause component is destroying");
});

test('callbackParams generation and global detection', function(assert) {
  var prop = new HandlerProperty('event', function(){});
  assert.equal(prop.callbackParams().length, 2, "put two params into array");
  assert.ok(prop.global(), "it's attached to window when no element selector passed");

  prop = new HandlerProperty('.button', 'event', function(){});
  assert.equal(prop.callbackParams().length, 3, "put three params into array");
  assert.notOk(prop.global(), "it's attached to internal element when selector passed");
});
