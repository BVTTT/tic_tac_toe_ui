import { FormView } from '../../app/views/form_view';

describe('FormView', function () {
  beforeEach(function () {
    this.formContainer = document.createElement('div');

    this.formContainer.innerHTML = `
      <form class="start-game-form">
        <select name="game-difficulty">
          <option value="easy">Easy</option>
          <option value="impossible" selected>Impossible</option>
        </select>
      </form>

      <button class="end-game-btn"/>
    `;

    this.subject = new FormView({ container: this.formContainer });
  });

  describe('#createGameData', function () {
    it('returns the selected game difficulty', function () {
      expect(this.subject.createGameData().difficulty).toEqual('impossible');
    });
  });
});
