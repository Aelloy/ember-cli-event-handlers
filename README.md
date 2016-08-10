# Ember-cli-event-properties

This tiny addon introduces syntactic sugar for handling external (jquery) events in components.

You can create handler as a property of component, using provided computed-property-like dsl, and it will be attached to selected element on `didInsertElement` and will detached on `willDestroyElement`. As long as Ember destroys element after destroying component, your handler stop reacting, once component is unavailable. It's done by monitoring `isDestroying`/`isDestroyed` properties of component.

## Configuration

By default mixin will be attached to every component, use configuration options to opt out in favor of manual use of mixin:

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
  
  // Or you want to supply optional selector to attach handler
  // on element inside of component
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
