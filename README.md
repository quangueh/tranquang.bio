# Quang Tran — Personal Brand Website

Portfolio cá nhân cao cấp, phong cách Apple / Vercel / Linear. Xây bằng **Next.js 16 + React 19 + Tailwind 4 + Framer Motion + Lenis**. Song ngữ Việt/Anh, dark/light mode, SEO đầy đủ.

## Chạy tại máy

```bash
npm install        # lần đầu
npm run dev        # mở http://localhost:3000
npm run build      # build production (kiểm tra lỗi)
npm start          # chạy bản production sau khi build
```

## Cấu trúc

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD, theme init
    page.tsx          # ghép các section
    globals.css       # design tokens, glass, aurora, animations
    sitemap.ts robots.ts manifest.ts icon.svg   # SEO
  components/
    aurora.tsx        # nền aurora + spotlight theo chuột + grid + noise
    cursor.tsx        # custom cursor (tự tắt trên mobile)
    navbar.tsx        # sticky, scroll-spy, toggle theme + ngôn ngữ
    magnetic-button.tsx
    reveal.tsx        # animation khi cuộn (fade + blur + stagger)
    loader.tsx        # màn hình loading có stroke animation
    theme-provider.tsx
    smooth-scroll.tsx # Lenis
    brand-icons.tsx   # icon GitHub/LinkedIn/Facebook (SVG)
    section-heading.tsx
    sections/         # hero, about, skills, stats, experience, projects, contact, footer
  lib/
    content.ts        # ★ TẤT CẢ NỘI DUNG Ở ĐÂY (song ngữ)
    i18n.tsx          # cơ chế chuyển VI/EN
legacy/               # bản prototype HTML cũ (có thể xóa)
```

## Sửa nội dung — chỉ cần 1 file

Mở **`src/lib/content.ts`**. Toàn bộ chữ nghĩa nằm ở đây, mỗi mục có dạng `{ vi: "...", en: "..." }`. Sửa là xong, không cần đụng vào code component.

Cần đổi:
- **hero**: tên, các vai trò (typing animation), tagline.
- **stats**: số liệu (20+ dự án, 500+ scripts...).
- **about**: đoạn giới thiệu + timeline (2022→2026).
- **skills**: danh sách kỹ năng, số năm, số dự án.
- **experience**: công ty, vị trí, mô tả.
- **projects**: tên, mô tả, tags, link demo/code, màu gradient (`c1`, `c2`).
- **contact.email** và **socials**: đổi `hello@yourdomain.com` và link GitHub/LinkedIn/Facebook.

### Đổi domain trong SEO
Tìm và thay `https://yourdomain.com` trong các file:
`src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`.

### Form liên hệ (hiện đang là demo)
File `src/components/sections/contact.tsx` — chỗ `await new Promise(...)` là giả lập gửi. Để gửi email thật, nối với **EmailJS** hoặc **Resend** (tạo API route `src/app/api/contact/route.ts` rồi `fetch` tới đó).

## Deploy lên Vercel

### Cách A — qua GitHub (khuyến nghị)
```bash
git add -A
git commit -m "feat: premium portfolio"
# tạo repo trên GitHub rồi:
git remote add origin <repo-url>
git push -u origin main
```
Vào https://vercel.com → **Add New → Project** → import repo. Vercel tự nhận Next.js → **Deploy**. Mỗi lần push sau này sẽ tự deploy lại.

### Cách B — Vercel CLI
```bash
npm i -g vercel
vercel          # deploy preview
vercel --prod   # deploy chính thức
```

## Trỏ domain `tranquang.bio` (mua tại WordPress.com) vào Vercel

1. Trong project trên Vercel → **Settings → Domains** → nhập `tranquang.bio` → **Add**. Thêm tiếp `www.tranquang.bio`.
2. Vào **WordPress.com → Upgrades → Domains → tranquang.bio → DNS records** (hoặc "Manage DNS / Name servers") và thêm:
   - Bản ghi **A**: host `@` → `76.76.21.21`
   - Bản ghi **CNAME**: host `www` → `cname.vercel-dns.com`
3. Chờ DNS cập nhật (15 phút–vài giờ). Vercel tự cấp HTTPS miễn phí.

> Lưu ý: domain phải đang ở chế độ "DNS records" của WordPress.com (không phải point sang WordPress site). Nếu WordPress.com cho phép, có thể đổi **nameserver** sang Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) để Vercel quản lý DNS — nhưng cách thêm A + CNAME ở trên đơn giản và đủ dùng.

## Checklist trước khi public
- [ ] Đã sửa hết nội dung trong `content.ts`
- [x] Đã đổi domain `tranquang.bio` ở layout/sitemap/robots
- [ ] Đã nối form liên hệ với email thật
- [ ] Thêm ảnh OG (`public/og.png`, 1200×630) và khai báo trong `layout.tsx` → `openGraph.images`
- [ ] `npm run build` không lỗi
