import 'es6-promise';
import 'whatwg-fetch';

function makeRequest(...params) {
  return fetch(...params)
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response;
      }

      // Fail with json object ready
      return response.json().then((json) => {
        throw json;
      });
    })
    .then((response) => {
      if(response.status === 204) {
        // Do not attempt to read stream if there is no content
        return null;
      }

      return response.json();
    });
}

export const TicTacToeApi = {
  init(router) {
    return router.homeUrl().then((url) => makeRequest(url));
  },

  createGame(router, { difficulty }) {
    return router.url('games').then((url) => {
      return makeRequest(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'games',
            attributes: { difficulty }
          }
        })
      });
    });
  },

  updateUserMoves(router, { position }) {
    return router.url('user_moves').then((url) => {
      return makeRequest(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'user_moves',
            attributes: { position }
          }
        })
      });
    })
  },

  updateCpuMoves(router) {
    return router.url('cpu_moves').then((url) => {
      return makeRequest(url, {
        method: 'PUT',
        headers: { Accept: 'application/json' }
      });
    });
  },

  deleteGame(router) {
    return router.url('self').then((url) => {
      return makeRequest(url, {
        method: 'DELETE',
        headers: { Accept: 'application/json' }
      });
    });
  }
};
