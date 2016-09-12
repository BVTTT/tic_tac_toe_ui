import { View } from './view';
import { Box } from './game_view/box';

import listen from 'event-listener';

export class GameView extends View {
  constructor(gameContainer) {
    super();
    this.gameContainer = gameContainer;

    this.defineEvents(['attempt-to-play']);
    this.initEventListeners();
  }

  setCpuPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.gameContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-cpu');
  }

  setUserPosition(position) {
    const [ x, y ] = position;
    const boxElement = this.gameContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    boxElement.classList.add('taken-by-user');
  }

  isActive() {
    return this.gameContainer.classList.contains('active');
  }

  activate() {
    this.gameContainer.classList.add('active');
  }

  initEventListeners() {
    listen(this.gameContainer, 'click', (nativeEvent) => {
      if(!this.isActive()) {
        return;
      }

      const eventName = 'attempt-to-play';
      const selectedBox = new Box(nativeEvent.target);
      const eventData = { eventName, selectedBox, nativeEvent };

      this.emit('attempt-to-play', [ eventData ]);
    });
  }
}
