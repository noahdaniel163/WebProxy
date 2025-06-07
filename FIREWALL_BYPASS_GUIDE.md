# 🚀 Advanced Web Proxy - Firewall Bypass Guide

## 🛡️ Các Tính Năng Bypass Firewall

### 1. **User-Agent Rotation**
- Tự động xoay 5 User-Agent khác nhau (Chrome, Firefox, Safari)
- Mỗi request sử dụng User-Agent ngẫu nhiên để tránh detection
- Bypass các firewall filter theo browser signature

### 2. **Header Spoofing** 
- Giả mạo headers để trông như traffic bình thường
- Xóa headers proxy như `X-Forwarded-For`, `X-Real-IP`
- Thêm headers chuẩn như `Accept`, `Accept-Language`

### 3. **Multiple Proxy Methods**

#### Method 1: Unblocker (Mặc định)
```
/proxy/https://blocked-site.com
```
- Sử dụng thư viện Unblocker
- Tốt nhất cho websites phức tạp
- Auto-rewrite links trong trang

#### Method 2: Direct Fetch 
```
/fetch/https://blocked-site.com
```
- Fetch trực tiếp qua server
- Tốt cho websites đơn giản
- Nhanh hơn, ít overhead

#### Method 3: Test Connectivity
```
/api/test/https://blocked-site.com
```
- Kiểm tra kết nối trước khi proxy
- Trả về status code và response time
- Hữu ích để chọn method phù hợp

### 4. **CORS & Security Bypass**
- Helmet middleware với CSP disabled
- CORS wildcard (`*`) để bypass restrictions  
- Compression để tăng tốc độ

## 🎯 Chiến Lược Bypass Theo Từng Loại Firewall

### Firewall Cơ Bản (URL Blocking)
✅ **Giải pháp**: Tất cả 3 methods đều hoạt động
- Thử Unblocker trước
- Nếu chậm thì chuyển sang Direct Fetch

### Firewall Nâng Cao (Deep Packet Inspection)
✅ **Giải pháp**: User-Agent rotation + Header spoofing
- Dùng method Direct Fetch
- Test URL trước để chọn method tối ưu

### Firewall Enterprise (Behavior Analysis)
✅ **Giải pháp**: Kết hợp nhiều technique
1. Test connectivity trước
2. Sử dụng random User-Agent
3. Thay đổi method nếu bị detect

## 📊 Bảng So Sánh Methods

| Method | Tốc Độ | Bypass Rate | Complexity | Khuyến Nghị |
|--------|--------|-------------|------------|-------------|
| Unblocker | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Cao | Websites phức tạp |
| Direct Fetch | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Thấp | Websites đơn giản |
| Test URL | ⭐⭐⭐⭐ | N/A | Thấp | Kiểm tra trước |

## 🔧 Advanced Configuration

### Thay Đổi Port (Tránh Detection)
```bash
PORT=9999 npm start  # Port cao hơn
PORT=7777 npm start  # Port ít phổ biến
```

### Environment Variables
```bash
export NODE_ENV=production
export TIMEOUT=15000
export USER_AGENT_ROTATE=true
```

## 💡 Tips Sử dụng Hiệu Quả

1. **Luôn test URL trước** bằng nút "Test URL"
2. **Thử các method khác nhau** nếu một method bị chặn
3. **Sử dụng HTTPS** thay vì HTTP khi có thể
4. **Thay đổi port** nếu bị detect
5. **Clear browser cache** thường xuyên

## 🚨 Troubleshooting

### Lỗi "Connection Timeout"
```
🔄 Giải pháp:
1. Thử method Direct Fetch
2. Kiểm tra URL có đúng không
3. Test connectivity trước
```

### Lỗi "Access Denied" 
```
🔄 Giải pháp:
1. Website có thể chặn proxy
2. Thử thay đổi User-Agent
3. Sử dụng method khác
```

### Lỗi "Page Not Loading"
```
🔄 Giải pháp:  
1. Thử Unblocker method
2. Kiểm tra kết nối internet
3. Restart proxy server
```

## 🎮 Quick Commands

```bash
# Start proxy
npm start

# Start với port khác
PORT=8080 npm start

# Development mode
npm run dev

# Test specific URL
curl http://localhost:8888/api/test/google.com
```

## ⚖️ Legal Notice

⚠️ **Lưu ý quan trọng:**
- Chỉ sử dụng cho mục đích hợp pháp
- Tuân thủ quy định nội bộ công ty/trường học
- Không sử dụng để truy cập nội dung bất hợp pháp
- Tôn trọng Terms of Service của websites

---
*Cập nhật: June 2025 | Version: Advanced Firewall Bypass Edition*