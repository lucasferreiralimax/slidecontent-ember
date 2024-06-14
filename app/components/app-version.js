import Component from '@glimmer/component';
import Ember from 'ember';
import { VERSION as emberVersion } from '@ember/version';

export default class SlideContentComponent extends Component {
  get appVersion() {
    return Ember.ENV.APP_VERSION;
  }
  get emberVersion() {
    return emberVersion;
  }
}
