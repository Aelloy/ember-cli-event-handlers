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