import { modifier } from 'ember-modifier';

export default modifier(function initializeAnimation(
  element,
  [initializeCallback],
) {
  initializeCallback(element);

  return () => {
    // Cleanup if necessary
  };
});
