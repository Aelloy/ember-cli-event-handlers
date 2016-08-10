import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Main');

test('it works', function(assert) {
  assert.expect(3);
  visit('/');
  
  andThen(() => {
    assert.equal(find(".clicked").text(), "0", "initial counter 0");
  });
  
  click('button.button');
  andThen(() => {
    assert.equal(find(".clicked").text(), "1", "counter increases");   
  });
  
  click('button.show');
  andThen(() => {
    assert.notOk(find("button.button").length, "component disappears");
  });
  
  // No ways to test global events on window this far (PR will be appreciated)
});
