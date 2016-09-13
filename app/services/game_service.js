import { Router } from './game_service/router';
import { TicTacToeApi } from './game_service/tic_tac_toe_api';
import { Game } from '../models/game';
import EventEmitter from 'wolfy87-eventemitter';

export class GameService extends EventEmitter {
  constructor(routingOptions) {
    super();

    this.defineEvents([
      'cpu-move-success',
      'cpu-move-fail',
      'user-move-success',
      'user-move-fail',
      'game-start-success',
      'game-start-fail'
    ]);

    this.router = new Router(routingOptions);
    this.initEventListeners();
  }

  startApiJourney() {
    return TicTacToeApi
      .init(this.router)
      .then((json) => this.router.hydrateLinks(json.links));
  }

  startGame(gameData) {
    return this.startApiJourney()
      .then(() => TicTacToeApi.createGame(this.router, gameData))
      .then((json) => {
        this.router.hydrateLinks(json.links);

        return new Game(json.data);
      })
      .then((game) => {
        const eventName = 'game-start-success';
        const eventData = { eventName, game }

        this.trigger(eventName, [ eventData ]);
      })
      .catch((response) => {
        const eventName = 'game-start-fail';
        const eventData = { eventName };

        this.trigger(eventName, [ eventData ]);
      });
  }

  updateCpuMove() {
    return TicTacToeApi.updateCpuMoves(this.router)
      .then((json) => {
        const playedPosition = json.related.cpu_moves.played_position;
        this.router.hydrateLinks(json.links);

        return [new Game(json.data), playedPosition];
      })
      .then(([ game, playedPosition ]) => {
        const eventName = 'cpu-move-success';
        const eventData = { eventName, playedPosition, game };

        this.trigger(eventName, [ eventData ]);
      })
      .catch((response) => {
        const eventName = 'cpu-move-fail';
        const eventData = { eventName, playedPosition: position };

        this.trigger(eventName, [ eventData ]);
      });
  }

  updateUserMove({ position }) {
    return TicTacToeApi.updateUserMoves(this.router, { position })
      .then((json) => {
        this.router.hydrateLinks(json.links);

        return new Game(json.data);
      })
      .then((game) => {
        const eventName = 'user-move-success';
        const eventData = { eventName, game, playedPosition: position };

        this.trigger(eventName, [ eventData ]);
      })
      .catch((response) => {
        const eventName = 'user-move-fail';
        const eventData = { eventName, playedPosition: position };

        this.trigger(eventName, [ eventData ]);
      });
  }

  deleteGame() {
    return TicTacToeApi.deleteGame(this.router);
  }

  initEventListeners() {
    this.on(/(user|cpu)-move-success/, ({ game }) => {
      if(game.isOver()) {
        const eventName = 'game-over';
        const eventData = { eventName, game };

        this.trigger('game-over', [ eventData ]);
      }
    });
  }
}
