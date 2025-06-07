const express = require('express');
const Unblocker = require('unblocker');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8888;

// Security và performance middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Tắt CSP để proxy hoạt động
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Danh sách User-Agent để rotate
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0'
];

// Hàm random User-Agent
const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

// Cấu hình Unblocker nâng cao
const unblocker = new Unblocker({
  prefix: '/proxy/',
  requestMiddleware: [
    // Thay đổi headers để bypass detection
    function(data) {
      data.headers['user-agent'] = getRandomUserAgent();
      data.headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
      data.headers['accept-language'] = 'en-US,en;q=0.5';
      data.headers['accept-encoding'] = 'gzip, deflate';
      data.headers['connection'] = 'keep-alive';
      data.headers['upgrade-insecure-requests'] = '1';
      delete data.headers['x-forwarded-for'];
      delete data.headers['x-real-ip'];
      return data;
    }
  ],
  responseMiddleware: [
    // Xử lý response để tối ưu
    function(data) {
      if (data.contentType && data.contentType.includes('text/html')) {
        // Inject thêm script để handle các link và form
        const injectScript = `
          <script>
            // Auto-handle links và forms
            document.addEventListener('DOMContentLoaded', function() {
              const links = document.querySelectorAll('a[href]');
              links.forEach(link => {
                if (link.href && !link.href.includes('/proxy/')) {
                  const originalHref = link.href;
                  if (originalHref.startsWith('http')) {
                    link.href = '/proxy/' + originalHref;
                  }
                }
              });
            });
          </script>
        `;
        if (data.toString().includes('</body>')) {
          data = data.toString().replace('</body>', injectScript + '</body>');
        }
      }
      return data;
    }
  ]
});

// Middleware để phục vụ static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route chính - hiển thị trang home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route xử lý form submission
app.post('/browse', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.redirect('/?error=empty');
  }
  
  // Thêm http:// nếu URL không có protocol
  let targetUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    targetUrl = 'http://' + url;
  }
  
  // Redirect đến proxy URL
  res.redirect('/proxy/' + targetUrl);
});

// Sử dụng Unblocker middleware
app.use(unblocker);

// Route xử lý proxy trực tiếp qua axios (method 2)
app.get('/fetch/:url(*)', async (req, res) => {
  try {
    const targetUrl = decodeURIComponent(req.params.url);
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      },
      timeout: 10000,
      maxRedirects: 5
    });

    // Set appropriate headers
    res.set('Content-Type', response.headers['content-type'] || 'text/html');
    res.send(response.data);
  } catch (error) {
    res.status(500).send(`Fetch error: ${error.message}`);
  }
});

// Route API để test connectivity
app.get('/api/test/:url(*)', async (req, res) => {
  try {
    const targetUrl = decodeURIComponent(req.params.url);
    const start = Date.now();
    
    const response = await axios.head(targetUrl, {
      headers: { 'User-Agent': getRandomUserAgent() },
      timeout: 5000
    });
    
    const responseTime = Date.now() - start;
    
    res.json({
      status: 'success',
      url: targetUrl,
      statusCode: response.status,
      responseTime: responseTime + 'ms',
      headers: response.headers
    });
  } catch (error) {
    res.json({
      status: 'error',
      url: req.params.url,
      error: error.message,
      code: error.code
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Proxy error: ' + err.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Web Proxy Server running on http://localhost:${PORT}`);
  console.log(`Access the proxy at http://localhost:${PORT}`);
});