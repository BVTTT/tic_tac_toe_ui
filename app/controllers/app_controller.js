import { AppView } from '../views/app_view';

export class AppController {
  constructor({ gameService, appContainer }) {
    this.view = new AppView(appContainer);

    this.gameService = gameService;
  }

  initEventListeners() {
    this.view.on('request-to-play', (eventData) => {
      const position = eventData.selectedBox.position();

      this.gameService.updateUserMove({ position });
    });

    this.gameService.on('game-start-success', () => {
      this.view.activateGame();

      this.gameService.updateCpuMove();
    });

    this.gameService.on('game-end-success', () => {
      this.view.deactiveGame();
    });

    this.gameService.on('cpu-move-success', ({ playedPosition }) => {
      this.view.setCpuPosition(playedPosition);
    });

    this.gameService.on('user-move-success', ({ playedPosition, game }) => {
      this.view.setUserPosition(playedPosition);

      if(game.isActive()) {
        this.gameService.updateCpuMove();
      }
    });

    this.gameService.on('game-over', ({ game }) => {
      this.gameService.deleteGame();
    });
  }
}
