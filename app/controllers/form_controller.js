import { FormView } from '../views/form_view';

export class FormController {
  constructor({ gameService, appContainer }) {
    this.gameService = gameService;
    this.view = new FormView({ container: appContainer.querySelector('.game-form-container')});
  }

  initEventListeners() {
    this.view.on('request-to-start-game', ({ gameData }) => {
      this.gameService.startGame(gameData);
    });

    this.view.on('request-to-end-game', (eventData) => {
      this.gameService.deleteGame();
    });

    this.gameService.on('game-start-success', () => {
      this.view.setActiveState();
    });

    this.gameService.on('game-end-success', () => {
      this.view.unsetActiveState();
    });
  }
}
