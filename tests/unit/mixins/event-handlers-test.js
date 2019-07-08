import Component from '@ember/component'
import { run } from '@ember/runloop'
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';
import HandlerProperty from 'ember-cli-event-handlers/handler-property';

module('Unit | Mixin', function(hooks) {
  setupTest(hooks);

  var fakeRenderer = {
    componentInitAttrs: function() {}
  };
  var noop = function() {};

  test('event handlers hooked up and hooked off', function(assert) {
    assert.expect(4);

    let MyComponent = Component.extend(EventHandlersMixin, {
      prop: handle('resize', noop)
    });

    let subject = MyComponent.create({ renderer: fakeRenderer });

    assert.ok(subject.prop instanceof HandlerProperty, "HandlerProperty created on component initialization");

    subject.prop.getSelector = function() {
      var handler = this;
      return {
        addEventListener() {
          assert.equal(handler.event, 'resize', "Event passed on didInsert");
        },
        removeEventListener() {
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

    let MyComponent = Component.extend(EventHandlersMixin, {
      prop: handle('event', noop)
    });

    let first = MyComponent.create({ renderer: fakeRenderer });
    let second = MyComponent.create({ renderer: fakeRenderer });

    assert.deepEqual(first, first.prop.component, "First Component instance bound");
    assert.deepEqual(second, second.prop.component, "Second Component instance bound");
  });
});
