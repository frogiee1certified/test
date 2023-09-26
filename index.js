const express = require('express');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');


const app = express();

// Replace the URL and cookies with your actual values
const targetURL = 'https://beta5.apktbg.com/';

const cookies = [
  // ... (your cookie objects here)
];

// Middleware to parse cookies
app.use(cookieParser());

// Redirect after 2 seconds
app.get('/redirect2', (req, res) => {
  res.redirect(302, '/class?domain=cod');
});

// Redirect after 10 seconds
app.get('/redirect10', (req, res) => {
  res.redirect(302, '/uv/education/hvtrs8%2F-nmw%2Cge%2Frlcy-aatkvkskol-ru%60lksjilg%2Filc-7%3B37%2Faanl%2Fod-fuvy');
});

// Redirect after 2 seconds
app.get('/redirect1', (req, res) => {
  res.redirect(302, '/stumble?domain=stumble');
});

// Redirect after 10 seconds
app.get('/redirect9', (req, res) => {
  res.redirect(302, '/uv/education/hvtrs8%2F-nmw%2Cge%2Frlcy-kktia%2Fgcmgs-7%3B9%3B%2Fqtwm%60lg-eu%7Bs');
});

// Serve the index.html when explicitly requested
// Serve the index.html when explicitly requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the index.html when explicitly requested
// Serve the index.html when explicitly requested
app.get('stumble.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'stumble.html'));
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

app.use((req, res, next) => {
  if (req.url !== '/stumble.html' && req.url !== '/redirect1' && req.url !== '/redirect9') {
    proxyMiddleware(req, res, next);
  } else {
    next();
  }
});

const PORT = 5000; // Change this to the desired port number
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
