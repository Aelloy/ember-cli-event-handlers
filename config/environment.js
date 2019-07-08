/* eslint-env node */
'use strict';

module.exports = function(env) {
  let ENV = {
    "ember-cli-event-handlers": {
      autoApply: false
    },
    APP: {}
  };

  if (env === 'test') {
    ENV.APP.autoboot = false;
  }

  return ENV;
};
