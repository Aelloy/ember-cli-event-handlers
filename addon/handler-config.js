import { assert } from '@ember/debug';
import { A } from '@ember/array';

export default class HandlerConfig {

  constructor() {
    var args = [...arguments];
    assert("Expects 2 to 4 arguments: event, root (optional), selector (optional) and callback", args.length > 1 && args.length < 5);

    this.func = args.pop();
    assert("Last argument must be a callback function", typeof this.func === 'function');

    this.event = args.shift();
    assert("Event argument must be a string", typeof this.event === 'string');

    this.root = args.shift();
    if (A(['component', 'body', 'window', 'document']).includes(this.root)) {
      this.selector = args.pop();
    } else {
      this.selector = this.root;
      this.root = 'component';
    }
    assert("Element argument must be a string or undefined", A(['string', 'undefined']).includes(typeof this.selector));

    this.auto = true;
  }

  setManual() {
    this.auto = false;
    return this;
  }
}
