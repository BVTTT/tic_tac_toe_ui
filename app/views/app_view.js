import EventEmitter from 'wolfy87-eventemitter';

import { StartGameFormView } from './start_game_form_view';
import { GameView } from './game_view';
import { forwardEvents } from '../utilities/forward_events';

export class AppView extends EventEmitter {
  constructor(appContainer) {
    super();
    this.formView = new StartGameFormView(appContainer.querySelector('.new-game'));
    this.gameView = new GameView(appContainer.querySelector('.game-container'));

    this.initEventListeners();
  }

  disableForm() {
    this.formView.disable();
  }

  activateGame() {
    this.gameView.activate();
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
