import { AppView } from './app_view';

const STATES = [
  'danger',
  'default',
  'warning',
  'success',
  'info'
];

export class LogView extends AppView {
  constructor({ container }) {
    super();
    this.container = container;
  }

  clearStates() {
    STATES.forEach((state) => {
      this.container.classList.remove(`panel-${state}`);
    });
  }

  addState(state) {
    this.container.classList.add(`panel-${state}`)
  }

  setText(text) {
    this.container.querySelector('.panel-heading').innerHTML = text;
  }

  log(state, text) {
    this.clearStates();
    this.addState(state);
    this.setText(text);
  }
}

/* Create simpler aliases */
STATES.forEach((state) => {
  LogView.prototype[state] = function (text) {
    this.log(state, text);
  }
});
