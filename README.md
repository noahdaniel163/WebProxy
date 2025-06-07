# Web Proxy Application

Ứng dụng web proxy đơn giản được xây dựng bằng Node.js và thư viện Unblocker, cho phép người dùng truy cập các website thông qua proxy server.

## ✨ Tính năng

- 🌐 Truy cập bất kỳ website nào qua proxy
- 🎨 Giao diện web đẹp mắt và responsive 
- ⚡ Liên kết nhanh đến các trang phổ biến
- 🔒 Xử lý URL tự động (thêm http:// nếu cần)
- 📱 Tương thích với mobile và desktop

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản 14 hoặc cao hơn)
- npm hoặc yarn

### Các bước cài đặt

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

1. Mở trình duyệt và truy cập `http://localhost:8888`
2. Nhập URL của website bạn muốn truy cập vào ô input
3. Nhấn nút "Go" hoặc press Enter
4. Website sẽ được tải thông qua proxy server
5. Có thể sử dụng các liên kết nhanh để truy cập các trang phổ biến

### Ví dụ URL hợp lệ:
- `google.com`
- `https://github.com`
- `youtube.com`
- `stackoverflow.com`

## 🏗️ Cấu trúc dự án

```
webproxy/
├── server.js          # Server chính (Express + Unblocker)
├── package.json       # Dependencies và scripts
├── README.md         # Tài liệu hướng dẫn
└── public/           # Frontend files
    ├── index.html    # Giao diện chính
    ├── style.css     # Styling
    └── script.js     # JavaScript client-side
```

## 🔧 Giải thích code chính

### Backend (server.js)
- **Express Server**: Tạo web server và xử lý HTTP requests
- **Unblocker Middleware**: Thư viện proxy chính để forward requests
- **Static Files**: Phục vụ các file HTML, CSS, JS
- **Form Handler**: Xử lý form submission từ frontend
- **URL Processing**: Tự động thêm protocol nếu thiếu

### Frontend (public/)
- **index.html**: Giao diện người dùng với form nhập URL
- **style.css**: Styling responsive với gradient background
- **script.js**: Validation, form handling, quick links

### Các thành phần chính:

1. **Proxy Engine**: Sử dụng Unblocker để proxy HTTP requests
2. **URL Handler**: Xử lý và chuẩn hóa URL input
3. **UI Components**: Form input, nút Go, quick links
4. **Error Handling**: Xử lý lỗi và validation

## ⚙️ Cấu hình

Có thể thay đổi port bằng cách set environment variable:
```bash
PORT=9000 npm start
```

Port mặc định là 8888. Ví dụ các port khác có thể sử dụng:
- 8888 (mặc định)
- 9000, 9001, 9002
- 7777, 8080, 8181

## 🚀 Triển khai

### Local Development
```bash
npm run dev  # Chạy với nodemon
```

### Production
```bash
npm start    # Chạy production mode
```

## 🔒 Lưu ý bảo mật

- Ứng dụng này chỉ dành cho mục đích học tập và test
- Không nên sử dụng cho production environment
- Cần cấu hình thêm security headers cho môi trường thực tế
- Cân nhắc thêm rate limiting và authentication

## 📝 License

MIT License

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

---
**Tác giả**: Web Proxy Development Team  
**Ngày tạo**: June 2025