import Ember from 'ember';
const { run, getOwner } = Ember;
import { moduleForComponent, test } from 'ember-qunit';
import { handle, handleManual, EventHandlersMixin } from 'ember-cli-event-handlers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-component', 'Integration | Component | my component', {
  integration: true
});

test('it renders and handles events properly', function(assert) {
  assert.expect(5);
  
  this.set('timesResized', 0);
  this.set('timesClicked', 0);
  this.set('show', true);

  this.register('component:my-component', Ember.Component.extend(EventHandlersMixin, {
    resizer: handle('resize', 'window', function() {
      this.incrementProperty('timesResized');
    }),

    clicker: handle('click', '.button', function() {
      this.incrementProperty('timesClicked');
    })
  }));

  this.render(hbs`
    {{#if show}}
      {{#my-component timesResized=(mut timesResized) timesClicked=(mut timesClicked)}}
        <button class='button'>Click me!</button>
      {{/my-component}}
    {{/if}}
  `);
  
  assert.ok(this.$('button.button').length, 'renders button');

  run(() => $(window).trigger('resize'));
  assert.equal(this.get('timesResized'), 1, "callback worked one time on resize");

  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('timesClicked'), 1, "callback worked one time on click");

  run(() => this.set('show', false));
  assert.notOk(this.$('button.button').length, 'component disappears');

  run(() => $(window).trigger('resize'));
  assert.equal(this.get('timesResized'), 1, "callback detached and counter doesn't change");
  
  getOwner(this).unregister('component:my-component');
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
  
  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('count'), 0, "nope, handler is deaf this far");
  
  this.set('handling', true);
  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('count'), 1, "started counting, yay!");
  
  this.set('handling', false);
  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('count'), 1, "handler is off again");
  
  getOwner(this).unregister('component:my-component');
});
