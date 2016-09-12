import 'es6-promise';
import 'whatwg-fetch';

class Router {
  constructor({ host = 'http://localhost:3000' } = {}) {
    this.host = host;
    this.links = {};
  }

  homeUrl() {
    return this.host;
  }

  url(linkName) {
    return this.links[linkName];
  }

  hydrateLinks(links) {
    this.links = links;
  }
}

export class TicTacToeApi {
  constructor(routingOptions) {
    this.router = new Router(routingOptions);
  }

  init() {
    const promise = fetch(this.router.homeUrl())
      .then((response) => response.json());

    promise.then((json) => this.router.hydrateLinks(json.links));

    return promise;
  }

  createGame({ difficulty }) {
    const promise = fetch(this.router.url('games'), {
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
      })
      .then((response) => response.json());

    promise.then((json) => this.router.hydrateLinks(json.links));

    return promise;
  }
}
