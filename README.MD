# Date With Wife ❤️ (Mini Web App)

## 1. Triển khai Google Apps Script (Lưu Sheet & Gửi Mail)
1. Truy cập [Google Sheets](https://docs.google.com/spreadsheets), tạo một bảng tính mới.
2. Ở thanh menu, chọn **Extensions (Tiện ích mở rộng) -> Apps Script**.
3. Copy toàn bộ code trong file `Code.gs` dán vào.
4. Bấm **Deploy (Triển khai) -> New deployment (Triển khai mới)**.
5. Chọn loại **Web app**.
   - Execute as: *Me* (Email của bạn).
   - Who has access: *Anyone* (Bất kỳ ai).
6. Bấm Deploy. Lần đầu tiên Google sẽ yêu cầu cấp quyền (Authorize access), hãy cứ Allow.
7. Copy đường link **Web app URL** được tạo ra.

## 2. Cấu hình Frontend
1. Mở file `js/config.js`.
2. Thay tên, địa chỉ email (để nhận thông báo) và dán URL vừa copy ở bước trên vào biến `scriptUrl`.
3. Thêm file nhạc mp3 vào thư mục `assets/audio/bgm.mp3`.

## 3. Triển khai lên Github Pages
1. Push toàn bộ source code này lên một repository public trên Github.
2. Vào **Settings** của repository -> Chuyển đến tab **Pages**.
3. Mục **Source**, chọn nhánh `main` (hoặc `master`), thư mục `/root` và bấm Save.
4. Chờ 1-2 phút, Github sẽ cấp cho bạn một đường link dạng `https://[username].github.io/[repo-name]`.
5. Copy link này và gửi qua Messenger/Zalo cho vợ thôi! 🎉