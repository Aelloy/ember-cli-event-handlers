import HandlerConfig from 'ember-cli-event-handlers/handler-config';
import { handle, handleManual} from 'ember-cli-event-handlers';
import { module, test } from 'qunit';

module('Unit | Handles');

var noop = function() {};

test('creates auto conf with minimal params', function(assert) {
  assert.expect(3);
  
  var config = handle('event', noop);
  assert.ok(config instanceof HandlerConfig, "Creates instance of HandlerConfig");
  assert.equal(config.root, 'component', "Sets component as default root");
  assert.notOk(config.selector, "Selection sets undefined");
});

test('creates auto conf with optional selector', function(assert) {
  assert.expect(2);
  
  var config = handle('event', '.button', noop);
  assert.equal(config.root, 'component', "Sets component as default root");
  assert.equal(config.selector, '.button', "Sets .button as selector");
});

test('creates auto conf with optional root', function(assert) {
  assert.expect(2);
  
  var config = handle('event', 'body', noop);
  assert.equal(config.root, 'body', "Sets body as a root");
  assert.notOk(config.selector, "Selection sets undefined");
});

test('creates auto conf with full set of params', function(assert) {
  assert.expect(2);
  
  var config = handle('event', 'body', '.button', noop);
  assert.equal(config.root, 'body', "Sets body as a root");
  assert.equal(config.selector, '.button', "Sets .button as a selector");
});

test('creates auto conf with nonesense params', function(assert) {
  assert.expect(2);
  
  var config = handle('event', '.button', 'body', noop);
  assert.equal(config.root, 'component', "Sets default root");
  assert.equal(config.selector, '.button', ".button is not a valid root, assumes it was a selector.");
});


test('create manual handler', function(assert) {
  assert.expect(1);

  var config = handleManual('event', function(){});
  assert.notOk(config.auto, "it's not automatic");
});
