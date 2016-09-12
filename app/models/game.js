export class Game {
  constructor() {
    this.id = null;
    this.attributes = null;
  }

  update(gameFromApi) {
    this.id = gameFromApi.id;
    this.attributes = gameFromApi.attributes;

    return gameFromApi;
  }

  isActive() {
  }
}
