import { modifier } from 'ember-modifier';

export default modifier(function changeLocale(
  element,
  [insertCallback],
  { destroyCallback },
) {
  insertCallback();

  return () => {
    if (destroyCallback) {
      destroyCallback();
    }
  };
});
