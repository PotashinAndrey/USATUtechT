import Server from './source/server/Server.js';
import config from './config.json';

main();

/** */
  function main() {
    new Server(config.server)
      .static()
      .start()
      .then(_ => console.log('app listening http://localhost:' + config.server.port));
  }
