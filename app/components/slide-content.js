import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';

export default class SlideContentComponent extends Component {
  @tracked slideAnimationInitial = null;
  @tracked slideAnimationOptions = null;
  @tracked activeSlideIndex = 0;
  @tracked slides = [];

  element = null;

  @action
  initializeAnimation(element) {
    this.element = element;
    this.slides = Array.from(element.querySelectorAll('.slide-item'));

    // Initialize activeSlideIndex based on the element with the 'actived' class
    this.slides.forEach((slide, index) => {
      if (slide.classList.contains('actived')) {
        this.activeSlideIndex = index;
      }
    });

    this.startSlideAnimation();
  }

  @action
  destroyAnimation() {
    this.stopSlideAnimation();
  }

  startSlideAnimation() {
    this.slideAnimationInitial = later(
      this,
      () => {
        this.nextHandler();
        this.startSlideAnimation();
      },
      6000,
    );

    if (this.args.direction && this.args.time) {
      cancel(this.slideAnimationInitial);
      this.slideAnimationOptions = later(
        this,
        () => {
          this.args.direction === 'prev'
            ? this.prevHandler()
            : this.nextHandler();
          this.startSlideAnimation();
        },
        Number(this.args.time),
      );

      if (this.args.disabled) {
        cancel(this.slideAnimationOptions);
      }
    }
  }

  stopSlideAnimation() {
    if (this.slideAnimationInitial) {
      cancel(this.slideAnimationInitial);
    }
    if (this.slideAnimationOptions) {
      cancel(this.slideAnimationOptions);
    }
  }

  @action
  prevHandler() {
    this.changeSlide('prev');
  }

  @action
  nextHandler() {
    this.changeSlide('next');
  }

  @action
  bulletHandler(index) {
    this.updateActiveSlide(index);
  }

  changeSlide(direction) {
    if (!this.element) return;

    const slides = this.slides;
    let activeSlide;

    slides.forEach((item, index) => {
      if (item.classList.contains('actived')) {
        item.classList.remove('actived');
        activeSlide = index;
      }
    });

    if (direction === 'next') {
      const nextIndex = (activeSlide + 1) % slides.length;
      slides[nextIndex].classList.add('actived');
      this.activeSlideIndex = nextIndex;
    } else {
      const prevIndex = (activeSlide - 1 + slides.length) % slides.length;
      slides[prevIndex].classList.add('actived');
      this.activeSlideIndex = prevIndex;
    }
  }

  updateActiveSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('actived', i === index);
    });
    this.activeSlideIndex = index;
  }
}
