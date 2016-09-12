import EventEmitter from 'wolfy87-eventemitter';

export class View {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  on(eventName, listener) {
    this.eventEmitter.addListener(eventName, listener);
  }

  emit(name, params = []) {
    this.eventEmitter.emitEvent(name, params);
  }

  defineEvents(...params) {
    this.eventEmitter.defineEvents(...params)
  }
}
