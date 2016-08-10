import HandlerConfig from 'ember-cli-event-handlers/handler-config';
import { module, test } from 'qunit';

module('Unit | HandlerConfig');

test('configuration', function(assert) {
  assert.expect(4);
  
  assert.throws(
    () => new HandlerConfig(),
    /Expects 2 to 4 arguments/,
    'Expect an error when not enough args provided'
  );

  assert.throws(
    () => new HandlerConfig('resize', 'other bullshit'),
    /Last argument must be a callback/,
    'Expect an error when last argument is not a function'
  );
  
  assert.throws(
    () => new HandlerConfig('resize', window, function() {}),
    /Element argument must be a string or undefined/,
    'Expect an error when optional element argument is not a string'
  );

  assert.ok(new HandlerConfig('resize', function() {}) instanceof HandlerConfig, "It is an instanceof HandlerConfig, yes cap!");
});

test('create manual handler', function(assert) {
  assert.expect(1);
  
  var config = new HandlerConfig('event', function(){});
  config.setManual();
  assert.notOk(config.auto, "is not automatic");
});
