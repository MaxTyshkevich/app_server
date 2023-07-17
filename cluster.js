/*  const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;
const PORT = 4000;

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = require('./app');
  const http = require('http');

  const server = http.createServer(app);

  server.listen(PORT + cluster.worker.id - 1, () => {
    console.log(
      `Worker ${cluster.worker.id} listening on port ${
        PORT + cluster.worker.id - 1
      }`
    );
  });
}

// Load balancer
const http = require('http');
const { roundRobin } = require('./utils/loadBalancing');

const servers = [];

for (let i = 1; i <= numCPUs; i++) {
  servers.push(`http://localhost:${PORT + i - 1}`);
}

http
  .createServer((req, res) => {
    const server = roundRobin(servers);
    console.log(`Request handled by Worker ${server.split(':')[2]}`);

    const proxy = http.request(server, (response) => {
      response.pipe(res, {
        end: true,
      });
    });

    req.pipe(proxy, {
      end: true,
    });
  })
  .listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

// utils/loadBalancing.js
let lastServerIndex = 0;

function roundRobin(servers) {
  const server = servers[lastServerIndex];
  lastServerIndex = (lastServerIndex + 1) % servers.length;
  return server;
}

module.exports = {
  roundRobin,
};


const startServer = require('./server');

startServer();
 */
