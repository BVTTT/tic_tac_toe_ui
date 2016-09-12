import { StartGameFormView } from './start_game_form_view';
import { GameView } from './game_view';
import { View } from './view';

export class AppView extends View {
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
    this.delegateAllEventsFrom(this.formView);
    this.delegateAllEventsFrom(this.gameView);
  }

  delegateAllEventsFrom(target) {
    target.on(/.+/, (eventData) => {
      this.emit(eventData.eventName, [eventData])
    });
  }
}
