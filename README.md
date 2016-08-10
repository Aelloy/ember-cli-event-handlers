# ember-cli-event-handlers

This tiny addon introduces a syntactic sugar for handling external (jquery) events in components.

You can create a handler using provided computed-property-like dsl and it will be attached to selected element on `didInsertElement` and will detached on `willDestroyElement`. As long as Ember destroys element after destroying component, your handler will stop reacting once component becomes unavailable. It's done by monitoring `isDestroying`/`isDestroyed` properties of the component.

## Configuration

By default the mixin will be attached to every component, use configuration options to opt out in favor of manual use of the mixin:

```js
// in /config/environment.js
    "ember-cli-event-handlers": {
      autoApply: false  
    }
```

## Usage

If you use `autoApply` mode:
```js
import { handle } from 'ember-cli-event-handlers';

export default Ember.Component.extend({
  
  // This will be attached to window object
  window_prop: handle('resize', function(event) {
    this.doSomeCoolStuffOnResize(event);
  }),
  
  // By supplying an optional selector you can attach handler
  // to the element inside of component template
  internal_prop: handle('scroll', '.button', function(event) {
    this.scrolled(event);
  })
});
```

Using mixin manually is easy:
```js
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';

export default Ember.Component.extend(EventHandlersMixin, {
  
  // Handler definitions will be the same
});
```
