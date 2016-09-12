import { TicTacToeApi } from '../../../app/services/game_service/tic_tac_toe_api';
import { Router } from '../../../app/services/game_service/router';
import fetchMock from 'fetch-mock';

describe('TicTacToeApi', function () {
  beforeEach(function () {
    this.subject = TicTacToeApi;

    this.router = new Router({ apiHost: 'http://thehost' });
  });

  describe('#init', function () {
    it('makes a request to the home url', function (done) {
      fetchMock.get('http://thehost', {
        sendAsJson: true,
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {}
      });

      this.subject.init(this.router).then(() => {
        expect(fetchMock.lastUrl()).toEqual('http://thehost');

        done();
      });
    });
  });

  describe('#createGame', function () {
    beforeEach(function () {
      this.router.hydrateLinks(Promise.resolve({ games: 'http://thegamesurl' }));
    });

    it('makes a request to the games url', function (done) {
      fetchMock.post('http://thegamesurl', {
        sendAsJson: true,
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        },
        body: { }
      });

      this.subject.createGame(this.router, { difficulty: 'easy' }).then(() => {
        const requestOptions = fetchMock.lastOptions();

        expect(fetchMock.lastUrl()).toEqual('http://thegamesurl');

        expect(requestOptions.method).toEqual('POST');

        expect(requestOptions.headers['Content-Type']).toEqual('application/json');
        expect(requestOptions.headers.Accept).toEqual('application/json');

        expect(JSON.parse(requestOptions.body).data.type).toEqual('games');
        expect(JSON.parse(requestOptions.body).data.attributes.difficulty).toEqual('easy');

        done();
      });
    });
  });

  describe('#updateCpuMoves', function () {
    beforeEach(function () {
      this.router.hydrateLinks(Promise.resolve({ cpu_moves: 'http://cpu_moves' }));
    });

    it('makes a request to the cpu moves url', function (done) {
      fetchMock.put('http://cpu_moves', {
        sendAsJson: true,
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: { }
      });

      this.subject.updateCpuMoves(this.router).then(() => {
        const requestOptions = fetchMock.lastOptions();

        expect(fetchMock.lastUrl()).toEqual('http://cpu_moves');

        expect(requestOptions.method).toEqual('PUT');
        expect(requestOptions.headers.Accept).toEqual('application/json');
        done();
      });
    });
  });

  describe('#updateUserMoves', function () {
    beforeEach(function () {
      this.router.hydrateLinks(Promise.resolve({ user_moves: 'http://user_moves' }));
    });

    it('makes a request to the cpu moves url', function (done) {
      fetchMock.put('http://user_moves', {
        status: 200,
        body: { },
        sendAsJson: true
      });

      this.subject.updateUserMoves(this.router, { position: [1, 2] }).then(() => {
        const requestOptions = fetchMock.lastOptions();
        expect(fetchMock.lastUrl()).toEqual('http://user_moves');

        expect(requestOptions.method).toEqual('PUT') ;
        expect(requestOptions.headers['Content-Type']).toEqual('application/json') ;
        expect(requestOptions.headers.Accept).toEqual('application/json') ;
        expect(JSON.parse(requestOptions.body).data.type).toEqual('user_moves');
        expect(JSON.parse(requestOptions.body).data.attributes.position).toEqual([1, 2]);
        done();
      });
    });
  });
});
