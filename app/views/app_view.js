import EventEmitter from 'wolfy87-eventemitter';

const ACTIVE_STATE_CLASS = 'active-game';

export class AppView extends EventEmitter {
  setActiveState() {
    this.container.classList.add(ACTIVE_STATE_CLASS);
  }

  unsetActiveState() {
    this.container.classList.remove(ACTIVE_STATE_CLASS);
  }

  isActive() {
    return this.container.classList.contains(ACTIVE_STATE_CLASS);
  }
}
