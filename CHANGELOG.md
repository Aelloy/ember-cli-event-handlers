# 0.0.6

Removed jQuery in favour of the native JS event listeners to support the modern Ember trends.

# 0.0.5

* Added 'document' keyword as event target, useful for tracking `visibilitychange` event for example
* Events that do not bubble up are now bound directly to the element, the list of such events:
  * scroll
  * focus/blur
  * load/unload
* Array polyfill has been removed. Ember <2.8 is not supported (but might work). Tested against official LTS releases/beta/canary.
* Upgrade to Ember 2.15 along with plugin boilerplate

# 0.0.4

* Upgrade to Ember 2.11

# 0.0.3

* Merged #1: removing devDependencies on shims

# 0.0.2

* Introducing `on()`/`off()` handler methods to manually turn it on and off
* Handler property `handling` to find out if it's on or off currently
* Introducing `handleManual` to setup handler that won't be attached/detached by default
* Default for `autoApply` config set to false
* Format of arguments for `handle()` changed: `event, root(window|body|component), selector, callback`. internally used like this $(root).on(event, selector, callback), defaults: root = 'component', selector = undefined.

# 0.0.1

* `EventHandlersMixin` to automatically manage handler attach/detach on `didInsertElement`/`willDestroyElement`
* `handle` helper method to instantiate handler `HandlerProperty`
* `HandlerProperty`
