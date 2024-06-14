'use strict';

module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null,
    'scss/load-no-partial-leading-underscore': null,
    'media-feature-name-no-unknown': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'font-family-no-missing-generic-family-keyword': null,
    'scss/no-duplicate-mixins': null,
    'scss/at-mixin-pattern': null,
    'keyframes-name-pattern': null,
  },
};
