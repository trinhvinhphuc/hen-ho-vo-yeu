document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo UI
    UI.init();
    
    // Giả lập Loading kết nối trái tim (1.5s)
    setTimeout(() => {
        document.getElementById('intro-text').innerText = "✓ Kết nối thành công";
        setTimeout(() => {
            UI.switchScene('scene-1');
            Animations.createFloatingHearts();
        }, 800);
    }, 1500);
});