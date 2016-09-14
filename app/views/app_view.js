import EventEmitter from 'wolfy87-eventemitter';

import { StartGameFormView } from './start_game_form_view';
import { GameView } from './game_view';
import { forwardEvents } from '../utilities/forward_events';
import listen from 'event-listener';

export class AppView extends EventEmitter {
  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
    this.statusContainer = appContainer.querySelector('.game-status');

    this.startGameFormView = new StartGameFormView(appContainer.querySelector('.start-game-form'));
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

  logInfo(message) {
    this.statusContainer.classList.remove('panel-danger');
    this.statusContainer.classList.remove('panel-default');
    this.statusContainer.classList.remove('panel-warning');
    this.statusContainer.classList.remove('panel-success');
    this.statusContainer.classList.add('panel-info');

    this.statusContainer.querySelector('.panel-heading').innerHTML = message;
  }

  logError(message) {
    this.statusContainer.classList.remove('panel-info');
    this.statusContainer.classList.remove('panel-default');
    this.statusContainer.classList.remove('panel-warning');
    this.statusContainer.classList.remove('panel-success');
    this.statusContainer.classList.add('panel-danger');

    this.statusContainer.querySelector('.panel-heading').innerHTML = message;
  }

  logWarning(message) {
    this.statusContainer.classList.remove('panel-info');
    this.statusContainer.classList.remove('panel-default');
    this.statusContainer.classList.remove('panel-danger');
    this.statusContainer.classList.remove('panel-success');
    this.statusContainer.classList.add('panel-warning');

    this.statusContainer.querySelector('.panel-heading').innerHTML = message;
  }

  logSuccess(message) {
    this.statusContainer.classList.remove('panel-info');
    this.statusContainer.classList.remove('panel-default');
    this.statusContainer.classList.remove('panel-danger');
    this.statusContainer.classList.remove('panel-warning');
    this.statusContainer.classList.add('panel-success');

    this.statusContainer.querySelector('.panel-heading').innerHTML = message;
  }


  initEventListeners() {
    const endGameButton = this.appContainer.querySelector('.end-game-btn');

    forwardEvents({ from: this.startGameFormView, to: this });
    forwardEvents({ from: this.gameView, to: this });

    listen(endGameButton, 'click', (nativeEvent) => {
      const eventName = 'request-to-end-game';
      const eventData = { eventName, nativeEvent };

      this.trigger(eventName, [ eventData ]);
    });
  }
}
