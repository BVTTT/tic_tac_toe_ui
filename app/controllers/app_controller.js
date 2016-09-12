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
    this.view.on('attempt-to-create-game', ({ gameData }) => {
      this.view.disableForm();

      this.gameService.startGame(gameData).then(([ game ]) => {
        this.view.activateGame();

        return this.gameService.updateCpuMove();
      }).then(([ game, playedPosition ]) => {
        this.view.setCpuPosition(playedPosition);
      });
    });

    this.view.on('attempt-to-play', (eventData) => {
      const position = eventData.selectedBox.position();

      this.gameService.updateUserMove({ position }).then(([ game, position ]) => {
        this.view.setUserPosition(position);
      }).then(() => {
        return this.gameService.updateCpuMove();
      }).then(([ game, playedPosition ]) => {
        this.view.setCpuPosition(playedPosition);
      });
    });
  }
}
