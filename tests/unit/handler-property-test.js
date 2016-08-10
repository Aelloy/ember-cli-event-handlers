import Ember from 'ember';
import HandlerProperty from 'ember-cli-event-handlers/handler-property';
import { handle } from 'ember-cli-event-handlers';
import { module, test } from 'qunit';

module('Unit | HandlerProperty');

var noop = function(){};

test('properly scopes callback', function(assert) {
  assert.expect(2);
  
  var obj = Ember.Object.create({counter: 0});
  var conf = handle('event', function() { this.incrementProperty('counter'); });
  var prop = new HandlerProperty(conf, obj);
  
  prop.callback();
  assert.equal(obj.counter, 1, "callback worked");
  
  obj.set('isDestroying', true);
  prop.callback();
  assert.equal(obj.counter, 1, "callback didn't work, cause component is destroying");
});

test('callbackParams generation', function(assert) {
  assert.expect(2);
  
  var prop = new HandlerProperty(handle('event', noop));
  assert.equal(prop.callbackParams().length, 2, "put two params into array");

  prop = new HandlerProperty(handle('event', '.button', noop));
  assert.equal(prop.callbackParams().length, 3, "put three params into array");
});

test('on/off methods', function(assert) {
  assert.expect(4);
  var prop = new HandlerProperty(handle('event', noop));
  prop.getSelector = function() {
    return {
      on(event, cb) {
        assert.equal(event, 'event', "event passed on 'on'");
        assert.equal(cb, prop.callback, "callback passed on 'on'");
      },
      off(event, cb) {
        assert.equal(event, 'event', "event passed on 'off'");
        assert.equal(cb, prop.callback, "callback passed on 'off'");
      }
    };
  };
  prop.on();
  prop.off();
});
