import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, find, triggerEvent } from '@ember/test-helpers';

module('Acceptance | Main', function(hooks) {
  setupApplicationTest(hooks);

  test('it works (run with autoApply: true)', async function(assert) {
    assert.expect(10);
    await visit('/');

    await click('button.button');
    assert.equal(find(".clicked").textContent, "0", "Handling is off");

    await click('button.handling');
    await click('button.button');
    assert.equal(find(".clicked").textContent, "1", "Handling is on, and we're counting");

    await click('button.handling');
    await click('button.button');
    assert.equal(find(".clicked").textContent, "1", "Handling is off again, no counting");

    await click('button.resize');
    assert.equal(find(".resized").textContent, "1", "Handling of resizes automatic, counting");

    await click('button.show');
    assert.notOk(find("button.button"), "component disappears");

    await click('button.resize');
    assert.equal(find(".resized").textContent, "1", "Handler was off, when component disappeared, no counting");

    await click('button.show');
    assert.equal(find(".scrolled").textContent, "0", "Initially scrolled 0 times");
    assert.equal(find(".visibility").textContent, "", "visibilitychange never triggered");

    await triggerEvent(".scrollable", "scroll");
    assert.equal(find(".scrolled").textContent, "1", "Scrolled 1 time");

    await triggerEvent(document, "visibilitychange");
    assert.equal(find(".visibility").textContent, "visible", "Becomes visible (kinda)");
  });
});
