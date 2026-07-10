function doPost(e) {
  try {
    // 1. Mở Sheet hiện tại
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Parse JSON từ frontend
    var data = JSON.parse(e.postData.contents);
    
    // 3. Thêm dòng vào Sheet
    sheet.appendRow([
      new Date(), // Timestamp
      data.Date,
      data.Time,
      data.Places,
      data.Actions,
      data.Message,
      data.LoveTicketID
    ]);
    
    // 4. Gửi Email thông báo
    var subject = "💖 Vợ đã xác nhận cuộc hẹn!";
    var body = "Thông tin chi tiết:\n\n" +
               "📅 Ngày: " + data.Date + "\n" +
               "⏰ Giờ: " + data.Time + "\n" +
               "📍 Địa điểm: " + data.Places + "\n" +
               "💕 Hành động: " + data.Actions + "\n" +
               "💌 Lời nhắn: " + data.Message + "\n" +
               "🎫 Mã vé: " + data.LoveTicketID;
               
    MailApp.sendEmail(data.EmailTo, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.message})).setMimeType(ContentService.MimeType.JSON);
  }
}