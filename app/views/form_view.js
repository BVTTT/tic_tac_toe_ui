import listen from 'event-listener';
import { AppView } from './app_view';

/**
 * Abstracts user interactions when interacting with the form
 *
 * It emits the following events:
 * - 'request-to-start-game'
 * - 'request-to-start-end'
 */
export class FormView extends AppView {
  constructor({ container }) {
    super();
    this.container = container;
    this.createGameForm = container.querySelector('.start-game-form');
    this.endGameButton = container.querySelector('.end-game-btn');
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

      const gameData = this.createGameData();
      const eventData = { gameData };

      this.trigger('request-to-start-game', [eventData]);
    });

    listen(this.endGameButton, 'click', () => {
      this.trigger('request-to-end-game');
    });
  }
}
