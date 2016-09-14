import { Router } from './game_service/router';
import { TicTacToeApi } from './game_service/tic_tac_toe_api';
import { Game } from '../models/game';
import EventEmitter from 'wolfy87-eventemitter';
import extend from 'extend';

export class GameService extends EventEmitter {
  static init(routingOptions) {
    const service = new GameService(routingOptions);

    service.initEventListeners();

    return service;
  }

  constructor(routingOptions) {
    super();

    // Define events to allow using RegExp listener
    this.defineEvents([ 'user-move-success', 'cpu-move-success' ]);

    this.router = new Router(routingOptions);
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
         this.trigger('game-start-success');
         this.trigger(`${game.currentPlayer()}-turn`);
       })
      .then(() => this.trigger('game-start-success'))
      .catch((response) => this.trigger('game-start-fail'));
  }

  updateCpuMove() {
    return TicTacToeApi.updateCpuMoves(this.router)
      .then((json) => {
        const playedPosition = json.related.cpu_moves.played_position;
        this.router.hydrateLinks(json.links);

        return [new Game(json.data), playedPosition];
      })
      .then(([ game, playedPosition ]) => {
        const eventData = { playedPosition, game };

        this.trigger('cpu-move-success', [ eventData ]);
      })
      .catch((response) => this.trigger('cpu-move-fail'));
  }

  updateUserMove({ position }) {
    return TicTacToeApi.updateUserMoves(this.router, { position })
      .then((json) => {
        this.router.hydrateLinks(json.links);

        return new Game(json.data);
      })
      .then((game) => {
        const eventData = { game, playedPosition: position };

        this.trigger('user-move-success', [ eventData ]);
      })
      .catch((error) => {
        this.trigger('user-move-fail', [ error ]);
      });
  }

  deleteGame() {
    return TicTacToeApi.deleteGame(this.router).then(() => this.trigger('game-end-success'));
  }

  initEventListeners() {
    this.on(/(user|cpu)-move-success/, (eventData) => {
      const events = [];

      if(eventData.game.isOver()) {
        events.push('game-over');
      } else {
        events.push(`${eventData.game.currentPlayer()}-turn`);
        events.push('game-change');
      }

      events.forEach((eventName) => {
        this.trigger(eventName, [ eventData ]);
      });
    });
  }
}
