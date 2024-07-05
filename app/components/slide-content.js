import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { runTask, cancelTask } from 'ember-lifeline';

export default class SlideContentComponent extends Component {
  @tracked slideAnimationInitial = null;
  @tracked slideAnimationOptions = null;
  @tracked activeSlideIndex = 0;
  @tracked slides = [];

  element = null;
  destroyToken = null;

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
    if (this.isDestroyed || this.isDestroying) return;

    this.slideAnimationInitial = runTask(
      this,
      () => {
        if (this.isDestroyed || this.isDestroying) return;
        this.nextHandler();
        this.startSlideAnimation();
      },
      6000,
    );

    if (this.args.direction && this.args.time) {
      if (this.destroyToken) {
        cancelTask(this.destroyToken);
      }
      this.destroyToken = runTask(
        this,
        () => {
          if (this.isDestroyed || this.isDestroying) return;
          this.args.direction === 'prev'
            ? this.prevHandler()
            : this.nextHandler();
          this.startSlideAnimation();
        },
        Number(this.args.time),
      );

      if (this.args.disabled) {
        cancelTask(this.destroyToken);
      }
    }
  }

  stopSlideAnimation() {
    cancelTask(this.slideAnimationInitial);
    cancelTask(this.destroyToken);
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
