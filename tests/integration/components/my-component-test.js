import Ember from 'ember';
const { run } = Ember;
import { moduleForComponent, test } from 'ember-qunit';
import { handle, handleManual, EventHandlersMixin } from 'ember-cli-event-handlers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-component', 'Integration | Component | my component', {
  integration: true
});

test('it renders and handles events properly', function(assert) {
  assert.expect(8);

  this.set('timesResized', 0);
  this.set('timesButtonClicked', 0);
  this.set('show', true);

  this.register('component:my-component', Ember.Component.extend(EventHandlersMixin, {
    classNames: ['my-component'],

    resizer: handle('resize', 'window', function() {
      this.incrementProperty('timesResized');
    }),

    clicker: handle('click', function() {
      this.incrementProperty('timesClicked');
    }),

    buttonClicker: handle('click', '.button', function() {
      this.incrementProperty('timesButtonClicked');
    })
  }));

  this.render(hbs`
    {{#if show}}
      {{#my-component timesResized=(mut timesResized) timesClicked=(mut timesClicked) timesButtonClicked=(mut timesButtonClicked)}}
        <button class='button'>Click me!</button>
      {{/my-component}}
    {{/if}}
  `);

  let component = document.querySelector('.my-component');
  let button = document.querySelector('button.button');

  assert.ok(button, 'renders button');

  let click_event = new Event('click', {bubbles: true});
  let resize_event = new Event('resize');

  run(() => window.dispatchEvent(resize_event));
  assert.equal(this.get('timesResized'), 1, "callback worked one time on resize");

  run(() => button.dispatchEvent(click_event));
  assert.equal(this.get('timesClicked'), 1, "component callback worked one time on button click");
  assert.equal(this.get('timesButtonClicked'), 1, "button callback worked one time on button click");

  run(() => component.dispatchEvent(click_event));
  assert.equal(this.get('timesClicked'), 2, "component callback worked one time on component click");
  assert.equal(this.get('timesButtonClicked'), 1, "button callback didn't work on component click");

  run(() => this.set('show', false));
  assert.notOk(document.querySelector('button.button'), 'component disappears');

  run(() => window.dispatchEvent(resize_event));
  assert.equal(this.get('timesResized'), 1, "callback detached and counter doesn't change");
});

test('component with manual handler', function(assert) {
  assert.expect(4);

  this.register('component:my-component', Ember.Component.extend(EventHandlersMixin, {
    handler: handleManual('click', '.button', function() {
      this.incrementProperty('count');
    }),

    toggleHandler: Ember.observer('handling', function() {
      if (this.handler.handling) {
        this.handler.off();
      } else {
        this.handler.on();
      }
    })
  }));

  this.set('handling', false);
  this.set('count', 0);

  this.render(hbs`
    {{#my-component count=(mut count) handling=handling}}
      <button class='button'>Click me!</button>
    {{/my-component}}
  `);

  assert.equal(this.get('count'), 0, "nothing happened yet");

  let button = document.querySelector('button.button');
  let click_event = new Event('click', {bubbles: true});

  run(() => button.dispatchEvent(click_event));
  assert.equal(this.get('count'), 0, "nope, handler is deaf this far");

  this.set('handling', true);
  run(() => button.dispatchEvent(click_event));
  assert.equal(this.get('count'), 1, "started counting, yay!");

  this.set('handling', false);
  run(() => button.dispatchEvent(click_event));
  assert.equal(this.get('count'), 1, "handler is off again");
});
