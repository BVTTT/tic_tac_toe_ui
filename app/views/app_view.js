import EventEmitter from 'wolfy87-eventemitter';

import { GameView } from './game_view';
import { forwardEvents } from '../utilities/forward_events';
import listen from 'event-listener';

export class AppView extends EventEmitter {
  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
    this.gameView = new GameView(appContainer.querySelector('.game-container'));

    this.initEventListeners();
  }

  activateGame() {
    this.appContainer.classList.add('active-game');
    this.gameView.clearAll();
  }

  deactiveGame() {
    this.appContainer.classList.remove('active-game');
  }

  setCpuPosition(playedPosition) {
    return this.gameView.setCpuPosition(playedPosition);
  }

  setUserPosition(playedPosition) {
    return this.gameView.setUserPosition(playedPosition);
  }

  initEventListeners() {
    forwardEvents({ from: this.gameView, to: this });
  }
}
