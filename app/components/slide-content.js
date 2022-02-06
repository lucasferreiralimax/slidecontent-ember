import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SlideContentComponent extends Component {
  constructor(...args) {
    super(...args);
  }

  @action slideAnimation(e) {
    let slideAnimationInitial = setInterval(() => {
      this.nextHandler(e);
    }, 6000);

    slideAnimationInitial;

    if (this.args.direction && this.args.time) {
      clearInterval(slideAnimationInitial);
      let slideAnimationOptions = setInterval(() => {
        this.args.direction == 'prev'
          ? this.prevHandler(e)
          : this.nextHandler(e);
      }, Number(this.args.time));

      if (this.disabled) {
        clearInterval(slideAnimationOptions);
      } else {
        slideAnimationOptions;
      }
    }
  }

  @action nextHandler(e) {
    const slides = e.target
      ? e.target.parentElement.parentElement.querySelectorAll('.slide-item')
      : e.querySelectorAll('.slide-item');

    for (let item of slides) {
      if (item.classList.contains('actived')) {
        if (item.nextElementSibling) {
          item.classList.remove('actived');
          item.nextElementSibling.classList.add('actived');
          break;
        } else {
          item.classList.remove('actived');
          slides[0].classList.add('actived');
        }
      }
    }
  }

  @action prevHandler(e) {
    const slides = e.target
      ? e.target.parentElement.parentElement.querySelectorAll('.slide-item')
      : e.querySelectorAll('.slide-item');

    for (let item of slides) {
      if (item.classList.contains('actived')) {
        if (item.previousElementSibling) {
          item.classList.remove('actived');
          item.previousElementSibling.classList.add('actived');
        } else {
          item.classList.remove('actived');
          slides[slides.length - 1].classList.add('actived');
        }
        break;
      }
    }
  }
}
