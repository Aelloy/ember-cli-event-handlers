import Component from '@ember/component'
import { run } from '@ember/runloop'
import { observer } from '@ember/object'
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { handle, handleManual, EventHandlersMixin } from 'ember-cli-event-handlers';

module('Integration | Component | my component', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders and handles events properly', async function(assert) {
    assert.expect(8);

    this.set('timesResized', 0);
    this.set('timesButtonClicked', 0);
    this.set('show', true);

    this.owner.register('component:my-component', Component.extend(EventHandlersMixin, {
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

    await render(hbs`
      {{#if show}}
        {{#my-component timesResized=(mut timesResized) timesClicked=(mut timesClicked) timesButtonClicked=(mut timesButtonClicked)}}
          <button class='button'>Click me!</button>
        {{/my-component}}
      {{/if}}
    `);

    assert.ok(find('button.button'), 'renders button');

    await triggerEvent(window, 'resize');
    assert.equal(this.get('timesResized'), 1, "callback worked one time on resize");

    await click('button.button');
    assert.equal(this.get('timesClicked'), 1, "component callback worked one time on button click");
    assert.equal(this.get('timesButtonClicked'), 1, "button callback worked one time on button click");

    await click('.my-component');
    assert.equal(this.get('timesClicked'), 2, "component callback worked one time on component click");
    assert.equal(this.get('timesButtonClicked'), 1, "button callback didn't work on component click");

    run(() => this.set('show', false));
    assert.notOk(document.querySelector('button.button'), 'component disappears');

    await triggerEvent(window, 'resize');
    assert.equal(this.get('timesResized'), 1, "callback detached and counter doesn't change");
  });

  test('component with manual handler', async function(assert) {
    assert.expect(4);

    this.owner.register('component:my-component', Component.extend(EventHandlersMixin, {
      handler: handleManual('click', '.button', function() {
        this.incrementProperty('count');
      }),

      toggleHandler: observer('handling', function() {
        if (this.handler.handling) {
          this.handler.off();
        } else {
          this.handler.on();
        }
      })
    }));

    this.set('handling', false);
    this.set('count', 0);

    await render(hbs`
      {{#my-component count=(mut count) handling=handling}}
        <button class='button'>Click me!</button>
      {{/my-component}}
    `);

    assert.equal(this.get('count'), 0, "nothing happened yet");

    await click('button.button');
    assert.equal(this.get('count'), 0, "nope, handler is deaf this far");

    this.set('handling', true);
    await click('button.button');
    assert.equal(this.get('count'), 1, "started counting, yay!");

    this.set('handling', false);
    await click('button.button');
    assert.equal(this.get('count'), 1, "handler is off again");
  });
});


