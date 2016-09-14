import { LogView } from '../views/log_view';

export class LogController {
  constructor({ gameService, appContainer }) {
    this.gameService = gameService;
    this.view = new LogView({
      container: appContainer.querySelector('.game-status')
    });
  }

  initEventListeners() {
    this.gameService.on('game-over', ({ game }) => {
      if(game.isDeadlocked()) {
        this.view.warning('Game is deadlocked');
      } else if(game.userWon()) {
        this.view.success('User won!');
      } else {
        this.view.danger('Cpu won :(');
      }
    });

    this.gameService.on('game-change', ({ game, playedPosition }) => {
      this.view.info(`It is the ${game.currentPlayer()}'s turn. Last player played at ${playedPosition.toString()}`);
    });

    this.gameService.on('user-move-fail', ({ response }) => {
      const errorMessage = response.errors[0].detail;

      this.view.danger(errorMessage);
    });
  }
}
