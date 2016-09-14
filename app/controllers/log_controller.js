import { LogView } from '../views/log_view';

export class LogController {
  constructor({ gameService, appContainer }) {
    this.gameService = gameService;
    this.log = new LogView({
      logContainer: appContainer.querySelector('.game-status')
    });
  }

  initEventListeners() {
    this.gameService.on('game-over', ({ game }) => {
      if(game.isDeadlocked()) {
        this.log.warning('Game is deadlocked');
      } else if(game.userWon()) {
        this.log.success('User won!');
      } else {
        this.log.danger('Cpu won :(');
      }
    });

    this.gameService.on('game-change', ({ game, playedPosition }) => {
      this.log.info(`It is the ${game.currentPlayer()}'s turn. Last player played at ${playedPosition.toString()}`);
    });

    this.gameService.on('user-move-fail', ({ response }) => {
      const errorMessage = response.errors[0].detail;

      this.log.danger(errorMessage);
    });
  }
}
