import { LogController } from './controllers/log_controller';
import { FormController } from './controllers/form_controller';
import { AppController } from './controllers/app_controller';
import { GameService } from './services/game_service';

export class App {
  constructor(body, routingOptions = {}) {
    const scope = {
      gameService: new GameService(routingOptions),
      appContainer: body.querySelector('.app-container')
    };

    this.controllers = [
      new AppController(scope),
      new LogController(scope),
      new FormController(scope)
    ]
  }

  init() {
    this.controllers.forEach((controller) => {
      controller.initEventListeners();
    });
  }
}
