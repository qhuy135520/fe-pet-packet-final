// server.js
const https = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(
      {
        key: fs.readFileSync('./key.pem'), 
        cert: fs.readFileSync('./cert.pem'),
        passphrase: '123123'
      },
      (req, res) => {
        handle(req, res);
      }
    )
    .listen(443, (err) => {
      if (err) throw err;
      console.log('> Server running at https://petserviceconnect.com');
    });
});
