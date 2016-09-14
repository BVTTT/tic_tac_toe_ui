import listen from 'event-listener';
import EventEmitter from 'wolfy87-eventemitter';

export class FormView extends EventEmitter {
  constructor({ formContainer }) {
    super();
    this.formContainer = formContainer;
    this.createGameForm = formContainer.querySelector('.start-game-form');
    this.endGameButton = formContainer.querySelector('.end-game-btn');

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

  setActiveGameState() {
    this.formContainer.classList.add('active-game');
  }

  removeActiveGameState() {
    this.formContainer.classList.remove('active-game');
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
