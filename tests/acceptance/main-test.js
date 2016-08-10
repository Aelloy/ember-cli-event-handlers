import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Main');

test('it works (run with autoApply: true)', function(assert) {
  assert.expect(6);
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
    assert.equal(find(".resized").text(), "1", "Handler was of, when component disappeared, no counting");   
  });
});
