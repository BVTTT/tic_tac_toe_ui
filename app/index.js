import { App } from './app';

const app = new App(document.body, { apiHost: 'http://192.168.99.100:3000' });

app.init();
