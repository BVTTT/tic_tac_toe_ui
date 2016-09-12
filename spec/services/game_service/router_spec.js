import { Router } from '../../../app/services/game_service/router';

describe('Router', function () {
  beforeEach(function () {
    this.subject = new Router();
  });

  describe('#homeUrl', function () {
    it('returns a promise with the host', function (done) {
      this.subject.homeUrl().then((url) => {
        expect(url).toEqual('http://localhost:3000');
        done();
      });
    });
  });

  describe('#url', function () {
    describe('before link hydration', function () {
      it('fails', function (done) {
        this.subject.url('aUrl').catch((error) => {
          expect(error.name).toEqual('UnavailableLinkError');
          done();
        });
      });
    });

    describe('after link hydration', function () {
      it('gets the link', function (done) {
        this.subject.hydrateLinks(Promise.resolve({ aUrl: 'theUrl' }));

        this.subject.url('aUrl').then((url) => {
          expect(url).toEqual('theUrl');

          done();
        });
      });
    });
  });
});
