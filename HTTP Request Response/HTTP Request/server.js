const http = require('http');
const cluster = require('cluster');
const fs = require('fs');
const path = require('path');

if (cluster.isMaster) {
  for (let i = 0; i <8; i++) {
    cluster.fork();
  }

  
} else {
  const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error(`Error loading ${filePath}:`, err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading page');
        return;
      }

      let contentType = 'text/html';
      if (filePath.endsWith('.css')) {
        contentType = 'text/css';
      } else if (filePath.endsWith('.js')) {
        contentType = 'application/javascript';
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });

  const PORT = 3000 + cluster.worker.id;

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening at http://localhost:${PORT}/`);
  });
}