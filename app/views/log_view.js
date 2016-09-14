const STATES = [
  'danger',
  'default',
  'warning',
  'success',
  'info'
];

export class LogView {
  constructor({ logContainer }) {
    this.logContainer = logContainer;
  }

  clearStates() {
    STATES.forEach((state) => {
      this.logContainer.classList.remove(`panel-${state}`);
    });
  }

  addState(state) {
    this.logContainer.classList.add(`panel-${state}`)
  }

  setText(text) {
    this.logContainer.querySelector('.panel-heading').innerHTML = text;
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
