import listen from 'event-listener';
import EventEmitter from 'wolfy87-eventemitter';

export class StartGameFormView extends EventEmitter {
  constructor(form) {
    super();
    this.form = form;

    this.defineEvents(['attempt-to-create-game']);
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

  disable() {
    const allElements = this.form.querySelectorAll('*');

    for(let element of allElements) {
      element.disabled = true;
    }
  }

  initEventListeners() {
    listen(this.form, 'submit', (nativeEvent) => {
      nativeEvent.preventDefault();

      const eventName = 'attempt-to-create-game';
      const gameData = this.data();
      const eventData = { eventName, nativeEvent, gameData };

      this.trigger(eventName, [eventData]);
    });
  }
}
