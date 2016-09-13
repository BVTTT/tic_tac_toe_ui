import listen from 'event-listener';

import { AppView } from '../views/app_view';
import { GameService } from '../services/game_service';

export class AppController {
  static init(body, routingOptions) {
    const appContainer = body.querySelector('.app-container');
    const controller = new AppController(appContainer, routingOptions);

    controller.initEventListeners();
  }

  constructor(appContainer, routingOptions = {}) {
    this.view = new AppView(appContainer);

    this.gameService = new GameService(routingOptions);
  }

  initEventListeners() {
    this.view.on('request-to-start-game', ({ gameData }) => {
      this.gameService.startGame(gameData);
    });

    this.view.on('request-to-play', (eventData) => {
      const position = eventData.selectedBox.position();

      this.gameService.updateUserMove({ position });
    });

    this.gameService.on('game-start-success', () => {
      this.view.activateGame();

      this.gameService.updateCpuMove();
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
      this.view.deactiveGame();
    });
  }
}
