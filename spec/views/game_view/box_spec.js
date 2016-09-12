import { Box } from '../../../app/views/game_view/box';

describe('Box', function () {
  beforeEach(function () {
    this.boxElement = document.createElement('div');
    this.boxElement.dataset.x = 1;
    this.boxElement.dataset.y = 2;

    this.subject = new Box(this.boxElement);
  });

  describe('#position', function () {
    it('returns the [x,y] position of the box', function () {
      expect(this.subject.position()).toEqual([1, 2]);
    });
  });
});
