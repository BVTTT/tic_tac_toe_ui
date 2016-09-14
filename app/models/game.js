export class Game {
  constructor(gameFromApi) {
    this.id = gameFromApi.id;
    this.attributes = gameFromApi.attributes;
  }

  isOver() {
    return this.attributes.states.is_over;
  }

  isActive() {
    return !this.isOver();
  }

  currentPlayer() {
    return this.attributes.current_player;
  }

  userWon() {
    return this.attributes.winner === 'user';
  }

  isDeadlocked() {
    return this.attributes.states.is_deadlocked;
  }
}
