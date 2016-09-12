class UnavailableLinkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnavailableLinkError';
  }
}

export class Router {
  constructor({ apiHost = 'http://localhost:3000' } = {}) {
    this.host = apiHost;
    this.links = null;
  }

  homeUrl() {
    return Promise.resolve(this.host);
  }

  url(linkName) {
    const linksPromise = this.links || Promise.reject(new UnavailableLinkError('No links have been cached'));

    return linksPromise.then((links) => {
      const url = links[linkName];

      if(url === undefined) {
        throw new UnavailableLinkError('This probably means this app is out of sink with the api');
      }

      return url;
    });
  }

  hydrateLinks(responseOrPromise) {
    this.links = Promise.resolve(responseOrPromise);;

    return this.links;
  }
}

