import listen from 'event-listener';

import { AppView } from '../views/app_view';
import { TicTacToeApi } from '../services/tic_tac_toe_api';

export class AppController {
  static init(body, routingOptions) {
    const appContainer = body.querySelector('.app-container');
    const controller = new AppController(appContainer, routingOptions);

    controller.initEventListeners();
    controller.ticTacToeApi.init();
  }

  constructor(appContainer, routingOptions = {}) {
    this.view = new AppView(appContainer);

    this.ticTacToeApi = new TicTacToeApi(routingOptions);
  }

  initEventListeners() {
    listen(this.view.startGameForm, 'submit', () => {
      this.ticTacToeApi.createGame({ difficulty: 'easy' }).then((response) => {
        console.log(response);
      });
    });
  }
}
