# Web Proxy Application

Ứng dụng web proxy đơn giản được xây dựng bằng Node.js và thư viện Unblocker, cho phép người dùng truy cập các website thông qua proxy server.

## ✨ Tính năng

- 🌐 Truy cập bất kỳ website nào qua proxy
- 🎨 Giao diện web đẹp mắt và responsive 
- ⚡ Liên kết nhanh đến các trang phổ biến
- 🔒 Xử lý URL tự động (thêm http:// nếu cần)
- 📱 Tương thích với mobile và desktop
- 🛡️ Bypass firewall và content filtering
- 🔄 Rotate User-Agent để tránh detection
- 🚀 Optimized với Alpine Linux (Docker image nhỏ gọn)

## 🐳 Docker Hub Image

**Image sẵn sàng sử dụng:** `noah36/webproxy:latest`

### Quick Start với Docker
```bash
# Pull và chạy image từ Docker Hub
docker pull noah36/webproxy:latest
docker run -d -p 8888:8888 --name webproxy noah36/webproxy:latest

# Truy cập: http://localhost:8888
```

### Docker Compose
```yaml
version: '3.8'
services:
  webproxy:
    image: noah36/webproxy:latest
    ports:
      - "8888:8888"
    environment:
      - NODE_ENV=production
      - PORT=8888
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--spider", "http://localhost:8888"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản 18 hoặc cao hơn)
- npm hoặc yarn
- Docker (nếu sử dụng container)

### Cách 1: Chạy với Docker (Khuyến nghị)

```bash
# Từ Docker Hub
docker run -d -p 8888:8888 --name webproxy noah36/webproxy:latest

# Hoặc build local
git clone <repo-url>
cd webproxy
docker build -t webproxy .
docker run -d -p 8888:8888 --name webproxy webproxy
```

### Cách 2: Chạy trực tiếp với Node.js

1. **Clone hoặc tải về mã nguồn**
```bash
cd webproxy
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy ứng dụng**
```bash
npm start
```

4. **Hoặc chạy ở chế độ development (với nodemon)**
```bash
npm run dev
```

5. **Truy cập ứng dụng**
   - Mở trình duyệt và truy cập: `http://localhost:8888`

## 📖 Cách sử dụng

### Giao diện Web
1. Mở trình duyệt và truy cập `http://localhost:8888`
2. Nhập URL của website bạn muốn truy cập vào ô input
3. Nhấn nút "Go" hoặc press Enter
4. Website sẽ được tải thông qua proxy server
5. Có thể sử dụng các liên kết nhanh để truy cập các trang phổ biến

### API Endpoints
```bash
# Proxy đến website
GET /proxy/{url}

# Fetch nội dung trực tiếp
GET /fetch/{url}

# Test connectivity
GET /api/test/{url}
```

### Ví dụ sử dụng:
```bash
# Qua giao diện web
http://localhost:8888

# Truy cập trực tiếp qua proxy
http://localhost:8888/proxy/google.com
http://localhost:8888/proxy/https://github.com

# Fetch API
http://localhost:8888/fetch/youtube.com

# Test connectivity
http://localhost:8888/api/test/stackoverflow.com
```

## 🏗️ Cấu trúc dự án

```
webproxy/
├── server.js              # Server chính (Express + Unblocker)
├── package.json           # Dependencies và scripts
├── Dockerfile            # Docker configuration
├── .dockerignore         # Docker ignore file
├── README.md             # Tài liệu hướng dẫn
├── FIREWALL_BYPASS_GUIDE.md  # Hướng dẫn bypass firewall
└── public/               # Frontend files
    ├── index.html        # Giao diện chính
    ├── style.css         # Styling
    └── script.js         # JavaScript client-side
```

## 🔧 Tính năng nâng cao

### 1. User-Agent Rotation
- Tự động thay đổi User-Agent để tránh detection
- Support nhiều browser fingerprints

### 2. Header Manipulation
- Loại bỏ headers có thể expose proxy
- Thêm headers giống real browser

### 3. Auto Link Processing
- Tự động convert các link trong trang
- Đảm bảo navigation hoạt động smooth

### 4. Security Features
- Helmet.js cho security headers
- CORS configuration
- Compression middleware

## ⚙️ Cấu hình

### Environment Variables
```bash
PORT=8888              # Port server (mặc định: 8888)
NODE_ENV=production    # Environment mode
```

### Cấu hình khác nhau
```bash
# Development mode
PORT=8888 NODE_ENV=development npm run dev

# Production mode  
PORT=8888 NODE_ENV=production npm start

# Custom port
PORT=9000 npm start
```

## 🚀 Triển khai

### Local Development
```bash
npm run dev  # Chạy với nodemon
```

### Production với Docker
```bash
# Build image
docker build -t webproxy .

# Run container
docker run -d \
  -p 8888:8888 \
  --name webproxy \
  --restart unless-stopped \
  webproxy
```

### Deploy lên Cloud
```bash
# Push image lên Docker Hub
docker tag webproxy your-username/webproxy:latest
docker push your-username/webproxy:latest

# Deploy trên VPS/Cloud với Docker
docker run -d -p 8888:8888 your-username/webproxy:latest
```

## 🔒 Bảo mật và Lưu ý

### Bảo mật
- ✅ Non-root user trong Docker container
- ✅ Security headers với Helmet.js
- ✅ Input validation và sanitization
- ⚠️ Chỉ dành cho mục đích học tập và test
- ⚠️ Không nên expose trực tiếp ra internet

### Performance
- ✅ Compression middleware
- ✅ Alpine Linux base image (nhỏ gọn)
- ✅ Health check cho container
- ✅ Connection keep-alive

### Limitations
- Một số website có thể detect và block proxy
- HTTPS sites có thể có certificate issues
- JavaScript-heavy sites có thể cần additional handling

## 📊 Monitoring

### Health Check
```bash
# Manual check
curl http://localhost:8888

# Docker health status
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Logs
```bash
# Docker logs
docker logs webproxy -f

# Local logs
npm start 2>&1 | tee app.log
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! 

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch  
5. Tạo Pull Request

## 📝 License

MIT License

## 🔗 Links

- **Docker Hub**: https://hub.docker.com/r/noah36/webproxy
- **Image Tag**: `noah36/webproxy:latest`
- **Size**: ~27MB (Alpine Linux based)

---
**Tác giả**: Web Proxy Development Team  
**Ngày tạo**: June 2025  
**Cập nhật**: June 2025