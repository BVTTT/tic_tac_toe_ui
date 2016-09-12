import { Router } from './game_service/router';
import { TicTacToeApi } from './game_service/tic_tac_toe_api';
import { Game } from '../models/game';

export class GameService {
  constructor(routingOptions) {
    this.router = new Router(routingOptions);
    this.currentGame = new Game();
  }

  startApiJourney() {
    return TicTacToeApi.init(this.router)
      .then((json) => [json, this.router.hydrateLinks(json.links)]);
  }

  startGame(gameData) {
    return this.startApiJourney()
      .then(() => TicTacToeApi.createGame(this.router, gameData))
      .then((json) => [json, this.currentGame.update(json.data)])
      .then(([json, _]) => this.router.hydrateLinks(json.links))
      .then(() => [this.currentGame]);
  }

  updateCpuMove() {
    return TicTacToeApi.updateCpuMoves(this.router)
      .then((json) => [json, this.currentGame.update(json.data)])
      .then(([json, _]) => [json, this.router.hydrateLinks(json.links)])
      .then(([json, _]) => [this.currentGame, json.related.cpu_moves.played_position])
  }

  updateUserMove({ position }) {
    return TicTacToeApi.updateUserMoves(this.router, { position })
      .then((json) => [json, this.currentGame.update(json.data)])
      .then(([json, _]) => [json, this.router.hydrateLinks(json.links)])
      .then(([json, _]) => [this.currentGame, position])
  }
}
