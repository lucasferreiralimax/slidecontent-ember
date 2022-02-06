import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SlideContentComponent extends Component {
  constructor(...args) {
    super(...args);
  }

  @service intl;

  @action changeLocale(e) {
    const buttons = e.target
      ? e.target.parentElement.querySelectorAll('button')
      : e.querySelectorAll('button');

    if (e.target) {
      this.intl.locale = e.target.textContent;
      localStorage.setItem('language', e.target.textContent);
    }

    for (let item of buttons) {
      if (item.classList.contains('actived')) {
        item.classList.remove('actived');
      }
      if (item.textContent === this.intl.locale[0]) {
        item.classList.add('actived');
      }
    }
  }
}
