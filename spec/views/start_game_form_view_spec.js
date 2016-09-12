import { StartGameFormView } from '../../app/views/start_game_form_view';

describe('StartGameFormView', function () {
  beforeEach(function () {
    this.form = document.createElement('form');

    this.form.innerHTML = `
      <select name="game-difficulty">
        <option value="easy">Easy</option>
        <option value="impossible" selected>Impossible</option>
      </select>
    `;

    this.subject = new StartGameFormView(this.form);
  });

  describe('#data', function () {
    it('returns the selected game difficulty', function () {
      expect(this.subject.data().difficulty).toEqual('impossible');
    });
  });
});
