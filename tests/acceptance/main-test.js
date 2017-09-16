import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Main');

test('it works (run with autoApply: true)', function(assert) {
  assert.expect(10);
  visit('/');

  click('button.button');
  andThen(() => {
    assert.equal(find(".clicked").text(), "0", "Handling is off");
  });

  click('button.handling');
  click('button.button');
  andThen(() => {
    assert.equal(find(".clicked").text(), "1", "Handling is on, and we're counting");
  });

  click('button.handling');
  click('button.button');
  andThen(() => {
    assert.equal(find(".clicked").text(), "1", "Handling is off again, no counting");
  });

  click('button.resize');
  andThen(() => {
    assert.equal(find(".resized").text(), "1", "Handling of resizes automatic, counting");
  });

  click('button.show');
  andThen(() => {
    assert.notOk(find("button.button").length, "component disappears");
  });

  click('button.resize');
  andThen(() => {
    assert.equal(find(".resized").text(), "1", "Handler was off, when component disappeared, no counting");
  });

  click('button.show');
  andThen(() => {
    assert.equal(find(".scrolled").text(), "0", "Initially scrolled 0 times");
    assert.equal(find(".visibility").text(), "", "visibilitychange never triggered");
  });

  triggerEvent(".scrollable", "scroll");
  andThen(() => {
    assert.equal(find(".scrolled").text(), "1", "Scrolled 1 time");
  });
  triggerEvent(document, "visibilitychange");
  andThen(() => {
    assert.equal(find(".visibility").text(), "visible", "Becomes visible (kinda)");
  });
});
