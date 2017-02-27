import Ember from 'ember';
const { run } = Ember;
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';
import HandlerProperty from 'ember-cli-event-handlers/handler-property';
import { module, test } from 'qunit';

module('Unit | Mixin');

var fakeRenderer = {
  componentInitAttrs: function() {}
};
var noop = function() {};

test('event handlers hooked up and hooked off', function(assert) {
  assert.expect(4);

  let Component = Ember.Component.extend(EventHandlersMixin, {
    prop: handle('resize', noop)
  });

  let subject = Component.create({ renderer: fakeRenderer });

  assert.ok(subject.prop instanceof HandlerProperty, "HandlerProperty created on component initialization");

  subject.prop.getSelector = function() {
    var handler = this;
    return {
      on() {
        assert.equal(handler.event, 'resize', "Event passed on didInsert");
      },
      off() {
        assert.equal(handler.event, 'resize', "Event passed on willDestroy");
      }
    };
  };

  run(() => subject.trigger('didInsertElement'));
  run(() => subject.trigger('willDestroyElement'));
  assert.deepEqual(subject, subject.prop.component, "Component instance bound");
});

test('two instances of the same Component have isolated handlers', function(assert) {
  assert.expect(2);

  let Component = Ember.Component.extend(EventHandlersMixin, {
    prop: handle('event', noop)
  });

  let first = Component.create({ renderer: fakeRenderer });
  let second = Component.create({ renderer: fakeRenderer });

  assert.deepEqual(first, first.prop.component, "First Component instance bound");
  assert.deepEqual(second, second.prop.component, "Second Component instance bound");
});
