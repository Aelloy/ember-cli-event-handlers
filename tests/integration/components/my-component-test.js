import Ember from 'ember';
const { run } = Ember;
import { moduleForComponent, test } from 'ember-qunit';
import EventHandlersMixin from 'ember-cli-event-handlers/mixins/event-handlers';
import handle from 'ember-cli-event-handlers/handle';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-component', 'Integration | Component | my component', {
  integration: true
});

test('it renders', function(assert) {
  this.set('timesCalled', 0);
  this.set('timesClicked', 0);
  this.set('show', true);

  this.register('component:my-component', Ember.Component.extend(EventHandlersMixin, {
    handler: handle('resize', function() {
      this.incrementProperty('timesCalled');
    }),

    clicker: handle('click', '.button', function() {
      this.incrementProperty('timesClicked');
    })
  }));

  this.render(hbs`
    {{#if show}}
      {{#my-component timesCalled=(mut timesCalled) timesClicked=(mut timesClicked)}}
        <button class='button'>Click me!</button>
      {{/my-component}}
    {{/if}}
  `);
  assert.ok(this.$('button.button').length, 'renders button');

  run(() => $(window).trigger('resize'));
  assert.equal(this.get('timesCalled'), 1, "callback worked one time");

  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('timesClicked'), 1, "callback worked one time");

  run(() => this.set('show', false));
  assert.notOk(this.$('button.button').length, 'component disappears');

  $(window).trigger('resize');    
  assert.equal(this.get('timesCalled'), 1, "callback detached and counter doesn't change");

  run(() => this.$('.button').trigger('click'));
  assert.equal(this.get('timesClicked'), 1, "callback detached and counter doesn't change");
});
