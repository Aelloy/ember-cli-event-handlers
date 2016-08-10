import Ember from 'ember';
const { run } = Ember;
import EventHandlersMixin from 'ember-cli-event-handlers/mixins/event-handlers';
import handle from 'ember-cli-event-handlers/handle';
import { module, test } from 'qunit';

module('Unit | Mixin');

test('event handlers hooked up and hooked off', function(assert) {
  assert.expect(4);

  var callback = function() {};
  var mixinStub = Ember.Mixin.create(EventHandlersMixin, {
    _getSelector() {
      return {
        on(event, func) {
          assert.equal(event, 'resize', "Event passed on didInsert");
          assert.equal(typeof func, 'function', "Function passed on didInsert");
        },
        off(event, func) {
          assert.equal(event, 'resize', "Event passed on willDestroy");
          assert.equal(typeof func, 'function', "Function passed on willDestroy");
        }
      };
    }    
  });
  
  let Component = Ember.Component.extend(mixinStub, {
    some_prop: handle('resize', callback)
  });

  let subject = Component.create();

  run(() => subject.trigger('didInsertElement'));
  run(() => subject.trigger('willDestroyElement'));
});
