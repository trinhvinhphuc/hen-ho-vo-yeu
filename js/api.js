const API = {
    async submitData(data) {
        try {
            const response = await fetch(CONFIG.scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Cần thiết cho Apps Script web app từ client
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return true; // no-cors luôn trả về opaque response, ta assume là true
        } catch (error) {
            console.error("Lỗi gửi data:", error);
            return false;
        }
    }
};