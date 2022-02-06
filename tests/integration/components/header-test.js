import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Header />`);

    assert.dom(this.element).hasText('SlideContentEmber Home Information');

    // Template block usage:
    await render(hbs`
      <Header>
        SlideContentEmber Home Information
      </Header>
    `);

    assert.dom(this.element).hasText('SlideContentEmber Home Information');
  });
});
