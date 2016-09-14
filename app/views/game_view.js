import listen from 'event-listener';
import EventEmitter from 'wolfy87-eventemitter';

import { Box } from './game_view/box';

export class GameView extends EventEmitter {
  constructor(gameContainer) {
    super();
    this.gameContainer = gameContainer;

    this.defineEvents(['request-to-play']);
    this.initEventListeners();
  }

  setCpuPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.gameContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-cpu');
    boxElement.innerHTML = 'O';
  }

  setUserPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.gameContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-user');
    boxElement.innerHTML = 'X';
  }

  initEventListeners() {
    listen(this.gameContainer, 'click', (nativeEvent) => {
      const eventName = 'request-to-play';
      const selectedBox = new Box(nativeEvent.target);
      const eventData = { eventName, selectedBox, nativeEvent };

      this.trigger(eventName, [ eventData ]);
    });
  }

  clearAll() {
    const allBoxes = this.gameContainer.querySelectorAll('.taken-by-user,.taken-by-cpu');

    Array.prototype.forEach.call(allBoxes, (box) => {
      box.classList.remove('taken-by-user');
      box.classList.remove('taken-by-cpu');
      box.innerHTML = '';
    });
  }
}
