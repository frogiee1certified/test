const express = require('express');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Replace the URL with your actual value
const targetURL = 'https://discord.com/';

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




// Proxy middleware to add cookies to the request
const proxyMiddleware = createProxyMiddleware({
  target: targetURL,
  changeOrigin: true,
});

// Use the proxy middleware for everything else
app.use((req, res, next) => {
  if (req.url !== '/index.html') {
    proxyMiddleware(req, res, next);
  } else {
    next();
  }
});

const PORT = 5000; // Change this to the desired port number
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
