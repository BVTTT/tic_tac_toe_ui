import EventEmitter from 'wolfy87-eventemitter';

import { StartGameFormView } from './start_game_form_view';
import { GameView } from './game_view';
import { forwardEvents } from '../utilities/forward_events';

export class AppView extends EventEmitter {
  constructor(appContainer) {
    super();
    this.appContainer = appContainer;

    this.formView = new StartGameFormView(appContainer.querySelector('.start-game-form'));
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
    forwardEvents({ from: this.formView, to: this });
    forwardEvents({ from: this.gameView, to: this });
  }
}
