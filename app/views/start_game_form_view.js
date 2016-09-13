import listen from 'event-listener';
import EventEmitter from 'wolfy87-eventemitter';

export class StartGameFormView extends EventEmitter {
  constructor(form) {
    super();
    this.form = form;

    this.defineEvents(['request-to-start-game']);
    this.initEventListeners();
  }

  gameDifficultySelect() {
    return this.form.querySelector('select[name="game-difficulty"]');
  }

  data() {
    const selectElement = this.gameDifficultySelect();
    const difficulty = selectElement.options[selectElement.selectedIndex].value;

    return { difficulty }
  }

  initEventListeners() {
    listen(this.form, 'submit', (nativeEvent) => {
      nativeEvent.preventDefault();

      const eventName = 'request-to-start-game';
      const gameData = this.data();
      const eventData = { eventName, nativeEvent, gameData };

      this.trigger(eventName, [eventData]);
    });
  }
}
