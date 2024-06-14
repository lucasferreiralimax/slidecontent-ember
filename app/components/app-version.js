import Component from '@glimmer/component';
import Ember from 'ember';

export default class SlideContentComponent extends Component {
  get appVersion() {
    return Ember.ENV.APP_VERSION;
  }
  get emberVersion() {
    return Ember.VERSION;
  }
}
