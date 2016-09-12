export class Game {
  constructor(gameFromApi) {
    this.id = gameFromApi.id;
    this.attributes = gameFromApi.attributes;
  }

  isOver() {
    return this.attributes.states.is_over;
  }

  isActive() { return !this.isOver(); }
}
