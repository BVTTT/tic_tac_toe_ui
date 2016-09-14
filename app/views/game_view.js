import listen from 'event-listener';
import { AppView } from './app_view'

import { Box } from './game_view/box';

export class GameView extends AppView {
  constructor({ container }) {
    super();
    this.container = container;

    this.initEventListeners();
  }

  startGame() {
    this.clearAll();
    this.setActiveState();
  }

  endGame() {
    this.unsetActiveState();
  }

  setCpuPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-cpu');
    boxElement.innerHTML = 'O';
  }

  setUserPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-user');
    boxElement.innerHTML = 'X';
  }

  initEventListeners() {
    listen(this.container, 'click', (nativeEvent) => {
      // halt if game is not active
      if(!this.isActive()) {
        return;
      }

      const eventName = 'request-to-play';
      const selectedBox = new Box(nativeEvent.target);
      const eventData = { eventName, selectedBox, nativeEvent };

      this.trigger(eventName, [ eventData ]);
    });
  }

  clearAll() {
    const allBoxes = this.container.querySelectorAll('.taken-by-user,.taken-by-cpu');

    Array.prototype.forEach.call(allBoxes, (box) => {
      box.classList.remove('taken-by-user');
      box.classList.remove('taken-by-cpu');
      box.innerHTML = '';
    });
  }
}
