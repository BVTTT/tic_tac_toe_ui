import { FormView } from '../views/form_view';

export class FormController {
  constructor({ gameService, appContainer }) {
    this.gameService = gameService;
    this.formView = new FormView({ formContainer: appContainer.querySelector('.game-form-container')});
  }

  initEventListeners() {
    this.formView.on('request-to-start-game', ({ gameData }) => {
      this.gameService.startGame(gameData);
    });

    this.formView.on('request-to-end-game', (eventData) => {
      this.gameService.deleteGame();
    });

    this.gameService.on('game-start-success', () => {
      this.formView.setActiveGameState();
    });

    this.gameService.on('game-end-success', () => {
      this.formView.removeActiveGameState();
    });
  }
}
