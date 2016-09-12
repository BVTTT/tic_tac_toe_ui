import { TicTacToeApi } from './tic_tac_toe_api';
import fetchMock from 'fetch-mock';

describe('TicTacToeApi', function () {
  beforeEach(function () {
    this.subject = new TicTacToeApi();
  });

  describe('#init', function () {
    beforeEach(function () {
      fetchMock.get('http://localhost:3000', (url, requestOptions) => {
        return {
          sendAsJson: true,
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            links: {
              games: 'theGameUrl'
            }
          }
        };
      });
    });

    it('hydrates the service links with the links from the response', function (done) {
      this.subject.init().then(() => {
        expect(this.subject.router.links.games).toEqual('theGameUrl');

        done();
      });
    });
  });

  describe('#createGame', function () {
    beforeEach(function () {
      this.subject.router.hydrateLinks({ games: 'http://localhost:3000/games' });

      fetchMock.post('http://localhost:3000/games', (url, requestOptions) => {
        expect(requestOptions.method).toEqual('POST');

        expect(requestOptions.headers['Content-Type']).toEqual('application/json');
        expect(requestOptions.headers.Accept).toEqual('application/json');

        expect(JSON.parse(requestOptions.body).data.type).toEqual('games');
        expect(JSON.parse(requestOptions.body).data.attributes.difficulty).toEqual('easy');

        return {
          sendAsJson: true,
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            data: {
              id: 'created-game',
              attributes: { }
            },
            links: {
              self: 'theGameUrl'
            }
          }
        };
      });
    });

    it('creates a game', function (done) {
      this.subject.createGame({ difficulty: 'easy' }).then((body) => {
        expect(body.data.id).toEqual('created-game');

        done();
      });
    });
  });
});
