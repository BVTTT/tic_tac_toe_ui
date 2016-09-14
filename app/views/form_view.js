import listen from 'event-listener';
import { AppView } from './app_view';

export class FormView extends AppView {
  constructor({ container }) {
    super();
    this.container = container;
    this.createGameForm = container.querySelector('.start-game-form');
    this.endGameButton = container.querySelector('.end-game-btn');

    this.initEventListeners();
  }

  gameDifficultySelect() {
    return this.createGameForm.querySelector('select[name="game-difficulty"]');
  }

  createGameData() {
    const selectElement = this.gameDifficultySelect();
    const difficulty = selectElement.options[selectElement.selectedIndex].value;

    return { difficulty }
  }

  initEventListeners() {
    listen(this.createGameForm, 'submit', (nativeEvent) => {
      nativeEvent.preventDefault();

      const eventName = 'request-to-start-game';
      const gameData = this.createGameData();
      const eventData = { eventName, nativeEvent, gameData };

      this.trigger(eventName, [eventData]);
    });

    listen(this.endGameButton, 'click', (nativeEvent) => {
      const eventName = 'request-to-end-game';
      const eventData = { eventName, nativeEvent };

      this.trigger(eventName, [ eventData ]);
    });
  }
}
