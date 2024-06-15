import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SlideContentComponent extends Component {
  @service intl;
  languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'ru-RU', 'zh-CN'];

  @action changeLocale(language) {
    if (typeof language === "string") {
      this.intl.setLocale([language]);
      localStorage.setItem('language', language);
    }
  }
}
