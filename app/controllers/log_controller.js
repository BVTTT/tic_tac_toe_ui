import { LogView } from '../views/log_view';

export class LogController {
  constructor({ gameService, appContainer }) {
    this.gameService = gameService;
    this.view = new LogView({
      container: appContainer.querySelector('.game-status')
    });
  }

  initEventListeners() {
    this.view.initEventListeners();

    this.gameService.on('game-over', ({ game }) => {
      if(game.isDeadlocked()) {
        this.view.default('Game is deadlocked');
      } else if(game.userWon()) {
        this.view.success('User won!');
      } else {
        this.view.warning('Cpu won :(');
      }
    });

    this.gameService.on('game-start-success', ({ game }) => {
      this.view.info(`It is the ${game.currentPlayer()}'s turn`);
    });

    this.gameService.on('game-change', ({ game, playedPosition }) => {
      this.view.info(`It is the ${game.currentPlayer()}'s turn. Last player played at ${playedPosition.toString()}`);
    });

    this.gameService.on('user-move-fail', ({ message }) => {
      this.view.danger(message);
    });
  }
}
