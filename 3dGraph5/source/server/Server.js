import express from 'express';

/** {Server} типа апи сервера и прочие настройки @class @export @default
  *
  */
  export default class Server {
  /** {Server} апи @constructor
    * @param {object} config конфиг сервера
    */
    constructor(config) {
      this.config = config;
      const app = express();
      this.app  = app;
      this.port = this.config.port;
    }

  /** */
    start() {
      return new Promise(resolve => this.app.listen(this.port, resolve));
    }

  /** */
    static() {
      const statics = this.config.static;

      this.app.use(express.static(statics.root));
      statics.modules
        .forEach(library => this.app.use(library.route, express.static(library.root)));
      return this;
    }
  }
