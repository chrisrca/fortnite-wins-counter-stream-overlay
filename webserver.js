const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const onePath = path.join(__dirname, 'onedigit.png');
const twoPath = path.join(__dirname, 'twodigit.png');
const threePath = path.join(__dirname, 'threedigit.png');
const fourPath = path.join(__dirname, 'fourdigit.png');
const fivePath = path.join(__dirname, 'fivedigit.png');
const sixPath = path.join(__dirname, 'sixdigit.png');
const winsFilePath = path.join(__dirname, 'wins.txt');
const fontPath = path.join(__dirname, 'font.ttf');
let wins = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve the HTML file
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(winsFilePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error reading file: ${err}`);
      } else {
        // Add refresh header to HTML file
        res.setHeader('Refresh', '5');
        res.statusCode = 200;
        wins = (parseInt(data.toString()))
        if (isNaN(wins)) {
          wins = 0
        }
        res.end(`<style>@font-face { font-family: "Burbank Big Condensed Bold"; src: url('/font.ttf'); }.container {background-size: cover;position: relative;text-align: center;color: rgb(255, 255, 255);}.text {position: absolute;bottom: 103px;left: 738px;font-size: 27px;font-weight: bold;font-family: "Burbank Big Condensed Bold", sans-serif;}</style><div class="container"><div class="text">${wins}</div><img src="threedigit.png"></div>`);
      }
    });
  } else if (req.headers.accept && req.headers.accept === 'text/event-stream') {
    // Set up SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  } else if (req.url === '/font.ttf') {
    res.setHeader('Content-Type', 'font/ttf');
    fs.readFile(fontPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error reading font file: ${err}`);
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    // Serve the PNG file
    res.setHeader('Content-Type', 'image/png');
    if (isNaN(wins)) {
      wins = 0
    }
    if (wins < 10) {
      fs.readFile(onePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (wins < 100) {
      fs.readFile(twoPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (wins < 1000) {
      fs.readFile(threePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (wins < 10000) {
      fs.readFile(fourPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (wins < 100000) {
      fs.readFile(fivePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else {
      fs.readFile(sixPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error reading file: ${err}`);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    }
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
