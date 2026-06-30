# Personal Brand Website

Website thương hiệu cá nhân (portfolio) viết bằng HTML/CSS/JS thuần — không cần build, chạy được ngay.

## Cấu trúc

```
index.html    # Toàn bộ nội dung trang
style.css     # Giao diện + dark mode + responsive
script.js     # Dark mode toggle + animation khi cuộn
vercel.json   # Cấu hình cho Vercel (clean URLs + security headers)
```

## Xem thử tại máy

Cách nhanh nhất: mở thẳng `index.html` bằng trình duyệt (double-click).

Hoặc chạy local server (khuyến nghị, để fonts/animation hoạt động chuẩn):

```bash
# Nếu có Python
python -m http.server 5500
# rồi mở http://localhost:5500

# Hoặc nếu có Node
npx serve .
```

## Tùy chỉnh nội dung (làm trước khi deploy)

Mở `index.html` và sửa các chỗ sau:
- `Your Name` → tên thật của bạn (có nhiều chỗ, dùng Find & Replace).
- Thẻ `<title>` và các thẻ `<meta>` ở phần `<head>` (mô tả, Open Graph).
- Phần Hero: nghề nghiệp, mô tả, số liệu thống kê (5+, 30+, 10+).
- Phần About: đoạn giới thiệu và danh sách kỹ năng (`.chip`).
- Phần Projects: tên dự án, mô tả, tags, link Live/Code.
- Phần Contact: đổi `hello@yourdomain.com` thành email của bạn.
- Social links: thay `https://github.com/`, `linkedin.com/`, `x.com/` bằng link của bạn.

### Đổi ảnh đại diện
Trong `index.html`, tìm khối `.avatar` và thay:
```html
<div class="avatar"><span>YN</span></div>
```
bằng:
```html
<div class="avatar"><img src="avatar.jpg" alt="Your Name"></div>
```
rồi bỏ ảnh `avatar.jpg` vào cùng thư mục.

## Deploy lên Vercel

### Cách A — Qua GitHub (khuyến nghị, deploy lại tự động khi sửa code)
1. Tạo repo mới trên GitHub, push toàn bộ thư mục này lên.
2. Vào https://vercel.com → **Add New → Project** → import repo vừa tạo.
3. Framework Preset để **Other**, các mục build để trống → **Deploy**.
4. Xong! Bạn có link dạng `your-project.vercel.app`.

### Cách B — Qua Vercel CLI (nhanh, không cần GitHub)
```bash
npm i -g vercel
cd d:/Website
vercel        # làm theo hướng dẫn, đăng nhập
vercel --prod # deploy bản chính thức
```

## Trỏ domain của bạn vào Vercel

1. Trong project trên Vercel → tab **Settings → Domains** → nhập domain của bạn (vd `tencua.ban`) → **Add**.
2. Vercel sẽ hiện các bản ghi DNS cần thêm. Thường là:
   - **Domain gốc** (`tencua.ban`): thêm bản ghi **A** trỏ về `76.76.21.21`.
   - **www** (`www.tencua.ban`): thêm bản ghi **CNAME** trỏ về `cname.vercel-dns.com`.
3. Vào trang quản lý domain (nơi bạn mua domain) → phần **DNS** → thêm đúng các bản ghi trên.
4. Chờ DNS cập nhật (vài phút đến vài giờ). Vercel tự cấp SSL (HTTPS) miễn phí.

> Mẹo: nếu nhà cung cấp domain hỗ trợ, bạn có thể đổi **nameserver** sang Vercel để Vercel quản lý DNS giúp — đỡ phải tự thêm bản ghi.

## Ghi chú
- Dark mode tự nhớ lựa chọn của người dùng và theo cả cài đặt hệ thống.
- Animation tự tắt nếu người dùng bật "reduce motion".
- Site đã responsive cho mobile.
