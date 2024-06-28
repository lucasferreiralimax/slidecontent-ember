import { modifier } from 'ember-modifier';

export default modifier(function destroyAnimation(element, [destroyCallback]) {
  return () => {
    destroyCallback();
  };
});
