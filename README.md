# ember-cli-event-handlers

[![Build Status](https://travis-ci.org/AutoCloud/ember-cli-event-handlers.svg?branch=master)](https://travis-ci.org/AutoCloud/ember-cli-event-handlers)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-event-handlers.svg)](https://emberobserver.com/addons/ember-cli-event-handlers)

This tiny addon introduces a syntactic sugar for handling external events in components.

You can create an event handler using the provided `handle` or `handleManual` descriptors similar to the computed property descriptors; the handler will be attached to the selected element on `didInsertElement` and will be detached on `willDestroyElement`. As long as Ember destroys an element after destroying a component, your handler will stop reacting once the component becomes unavailable. It's done by monitoring `isDestroying`/`isDestroyed` properties of the component.

## Configuration

Add the mixin to the components in which it will be used. Also, there's an option to apply the mixin to every component in your application; to do this, use the following configuration option:

```js
// in /config/environment.js
    "ember-cli-event-handlers": {
      autoApply: true
    }
```

## Usage

### Definition

Basically, this addon defines a new property descriptor `handle` that can be used as follows:

`propertyName: handle(event, rootElement, selector, callback)`

where:

`event` is one of the DOM event names, such as `'click'`, `'mouseover'`, etc.

`rootElement`: `'component'` (used by default if this argument is omitted), `'document`', `'window'`, or `'body'`.

`selector`: a string defining the element to which the handler is attached (within the specified root element).

`callback`: a function that will handle the event; receives the triggered event as the argument.

You can omit `rootElement` (then the handler will be bound to the component's element) and/or `selector`.

### Examples

```js
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';

export default Ember.Component.extend(EventHandlersMixin, {
  
  // This will be attached to window object
  windowProp: handle('resize', 'window', function(event) {
    this.doSomeCoolStuffOnResize(event);
  }),
  
  // By supplying an optional selector you can attach handler
  // to the element inside of component template
  internalProp: handle('scroll', '.chat-container', function(event) {
    this.scrolled(event);
  })
});
```

Or, if you have enabled the `autoApply` mode:

```js
import { handle } from 'ember-cli-event-handlers';

export default Ember.Component.extend({
  
  // Handler definitions will be the same
});
```

### Additional methods

Let's assume you've attached the handler to the `handlerProp` property of your component. Then you can use the following methods:

`this.handlerProp.off()` to temporarily deactivate the specified event handler, and

`this.handlerProp.on()` to activate this handler again.

Also, when defining your handler, you can use `handleManual` descriptor instead of `handle`. The handlers defined this way will be active only after being enabled with `.on()`. Use `handling` property of handler to find out if it's `on` or `off` right now. Example:

```js
import { handle, EventHandlersMixin } from 'ember-cli-event-handlers';

export default Ember.Component.extend(EventHandlersMixin, {
  
  // This handler will only start working once it's activated with on()
  scrollHandler: handleManual('scroll', '.chat-container', function(event) {
    this.scrolled(event);
  }),

  // ...

  actions: {
    // The scroll handler activates when this action is triggered
    enableScrolling() {
      this.scrollHandler.on();
    },

    // This action makes the scroll handler inactive
    disableScrolling() {
      this.scrollHandler.off();
    }
  }
});
```
