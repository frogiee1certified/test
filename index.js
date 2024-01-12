const express = require('express');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');


const app = express();

// Replace the URL and cookies with your actual values
const targetURL = 'https://educationbluesky.com/';

const cookies = [
  // ... (your cookie objects here)
];
// yes
// Middleware to parse cookies
app.use(cookieParser());

// Redirect after 2 seconds
app.get('/redirect2', (req, res) => {
  res.redirect(302, '/class?domain=roblox');
});

// Redirect after 10 seconds
app.get('/redirect10', (req, res) => {
  res.redirect(302, '/uv/education/hvtrs8%2F-nmw%2Cge%2Frlcy-ulcwbg%2F5054-nmw');
});

// Serve the index.html when explicitly requested
// Serve the index.html when explicitly requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Serve the index.html when explicitly requested
// Serve the index.html when explicitly requested
app.get('/loading.mp4', (req, res) => {
  res.sendFile(path.join(__dirname, '/loading.mp4'));
});

app.get('/checksum.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '/checksum.txt'));
});

app.get('/play/kitika-games/7999/stumble-guys.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/kitika-games/7999/stumble-guys.html'));
});

app.get('/play/activision-publishing-inc/7935/call-of-duty.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/activision-publishing-inc/7935/call-of-duty.html'));
});

app.get('/play/playducky/7199/melon-sandbox.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/playducky/7199/melon-sandbox.html'));
});

app.get('/play/psyonix-studios/4656/rocket-league.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/psyonix-studios/4656/rocket-league.html'));
});

app.get('/play/electronic-arts/1353/ea-sports-fc-mobile-24-soccer.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/electronic-arts/1353/ea-sports-fc-mobile-24-soccer.html'));
});

app.get('/play/pixel-gun-3d/2652/pixel-gun.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/pixel-gun-3d/2652/pixel-gun.html'));
});

app.get('/play/play/robtop-games/1400/geometry-dash.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/robtop-games/1400/geometry-dash.html'));
});

app.get('/play/devsisters-corporation/3475/cookie-run.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/devsisters-corporation/3475/cookie-run.html'));
});

app.get('/play/uncube/7074/now.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/uncube/7074/now.html'));
});

app.get('/play/epic-games/7308/fortnite.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/play/epic-games/7308/fortnite.html'));
});

// Proxy middleware to add cookies to the request
const proxyMiddleware = createProxyMiddleware({
  target: targetURL,
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    // Adding cookies to the request
    cookies.forEach(cookie => {
      proxyReq.setHeader('cookie', `${cookie.name}=${cookie.value}`);
    });
  },
});

// Use the proxy middleware for everything else
app.use((req, res, next) => {
  if (req.url !== '/index.html' && req.url !== '/redirect2' && req.url !== '/redirect10') {
    proxyMiddleware(req, res, next);
  } else {
    next();
  }
});

const PORT = 5000; // Change this to the desired port number
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
