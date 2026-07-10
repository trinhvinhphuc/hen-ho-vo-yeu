const UI = {
    noClickCount: 0,
    noTexts: ["Không", "Không đâu", "Ơ...", "Đừng mà", "Anh buồn đó", "Em chắc chưa?", "Bấm YES đi ❤️"],
    selectedData: { time: '', places: [], actions: [] },

    init() {
        document.getElementById('wife-name-display').innerText = CONFIG.wifeName;
        document.getElementById('bg-music').src = CONFIG.music;
        document.getElementById('cat-gif').src = CONFIG.catGif;
        
        this.bindEvents();
    },

    switchScene(sceneId) {
        document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
        document.getElementById(sceneId).classList.add('active');
    },

    bindEvents() {
        // Music Toggle
        const bgMusic = document.getElementById('bg-music');
        document.getElementById('music-toggle').addEventListener('click', (e) => {
            if(bgMusic.paused) { bgMusic.play(); e.target.innerText = '🔊'; }
            else { bgMusic.pause(); e.target.innerText = '🔇'; }
        });

        // Scene 1 Envelope
        document.querySelector('.envelope-wrapper').addEventListener('click', function() {
            this.classList.add('open');
            bgMusic.play().catch(()=>{}); // Auto play music on first interaction
            document.getElementById('music-toggle').innerText = '🔊';
            setTimeout(() => {
                UI.switchScene('scene-2');
                Animations.typeWriter("Anh có một lời mời nhỏ...\nEm có đồng ý đi hẹn hò với anh không? 🥺❤️", 'typewriter-text', () => {
                    document.getElementById('cat-gif').classList.remove('hidden');
                    document.querySelector('.action-buttons').classList.remove('hidden');
                });
            }, 1500);
        });

        // Scene 2 Buttons
        document.getElementById('btn-yes').addEventListener('click', () => {
            Animations.confetti();
            if(navigator.vibrate) navigator.vibrate(200);
            setTimeout(() => UI.switchScene('scene-3'), 1000);
        });

        // --- ĐOẠN MỚI THAY THẾ VÀO ĐÂY ---
        const btnNo = document.getElementById('btn-no');
        const btnYes = document.getElementById('btn-yes');

        const evadeNo = (e) => {
            e.preventDefault();
            this.noClickCount++;
            
            if(this.noClickCount >= 20) {
                document.getElementById('joke-modal').classList.remove('hidden');
                setTimeout(() => document.getElementById('joke-modal').classList.add('hidden'), 3000);
                return;
            }

            btnNo.innerText = this.noTexts[this.noClickCount % this.noTexts.length];
            
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const yesRect = btnYes.getBoundingClientRect();
            
            let randomX, randomY;
            let isOverlapping = true;
            let safetyCounter = 0;
            const padding = 30; 

            while (isOverlapping && safetyCounter < 100) {
                randomX = padding + Math.random() * (screenWidth - btnNo.offsetWidth - (padding * 2));
                randomY = padding + Math.random() * (screenHeight - btnNo.offsetHeight - (padding * 2));
                
                const noLeft = randomX;
                const noRight = randomX + btnNo.offsetWidth;
                const noTop = randomY;
                const noBottom = randomY + btnNo.offsetHeight;

                const overlapX = (noRight + 20 > yesRect.left) && (noLeft - 20 < yesRect.right);
                const overlapY = (noBottom + 20 > yesRect.top) && (noTop - 20 < yesRect.bottom);

                if (!overlapX || !overlapY) {
                    isOverlapping = false;
                }
                safetyCounter++;
            }
            
            btnNo.style.position = 'fixed';
            btnNo.style.left = `${randomX}px`;
            btnNo.style.top = `${randomY}px`;
            btnNo.style.zIndex = '999';
        };
        
        btnNo.addEventListener('mouseover', evadeNo);
        btnNo.addEventListener('touchstart', evadeNo, { passive: false });
        // ---------------------------------

        // Scene 3 Card Selections
        this.setupCardSelection('time-grid', 'time', false); // Single select
        this.setupCardSelection('place-grid', 'places', true); // Multi select
        this.setupCardSelection('action-grid', 'actions', true); // Multi select

        // Submit Logic
        document.getElementById('btn-submit').addEventListener('click', async () => {
            const date = document.getElementById('date-picker').value;
            if(!date || !this.selectedData.time) {
                alert("Em nhớ chọn Ngày và Giờ nha ❤️"); return;
            }

            document.getElementById('btn-submit').classList.add('hidden');
            document.getElementById('loading-submit').classList.remove('hidden');

            const ticketID = 'DATE-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            
            const payload = {
                Date: date,
                Time: this.selectedData.time,
                Places: this.selectedData.places.join(', '),
                Actions: this.selectedData.actions.join(', '),
                Message: document.getElementById('message-box').value,
                LoveTicketID: ticketID,
                EmailTo: CONFIG.email
            };

            await API.submitData(payload);
            
            // Go to Scene 4
            UI.renderTicket(payload);
            UI.switchScene('scene-4');
            Animations.confetti();
        });
    },

    setupCardSelection(containerId, dataKey, isMulti) {
        const container = document.getElementById(containerId);
        container.addEventListener('click', (e) => {
            if(e.target.classList.contains('card')) {
                if(!isMulti) {
                    container.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
                    this.selectedData[dataKey] = e.target.innerText;
                    e.target.classList.add('selected');
                } else {
                    e.target.classList.toggle('selected');
                    const val = e.target.innerText;
                    if(e.target.classList.contains('selected')) {
                        this.selectedData[dataKey].push(val);
                    } else {
                        this.selectedData[dataKey] = this.selectedData[dataKey].filter(item => item !== val);
                    }
                }
            }
        });
    },

    renderTicket(data) {
        document.getElementById('ticket-name').innerText = CONFIG.wifeName;
        document.getElementById('ticket-date').innerText = data.Date;
        document.getElementById('ticket-time').innerText = data.Time;
        // Thay thế dòng qr-code cũ bằng dòng này:
        const secretMessage = `Mã vé: ${data.LoveTicketID}\nChồng xác nhận lịch hẹn đi chơi với ${CONFIG.wifeName} nhé! Yêu vợ nhiều lắm ❤️`;
        document.getElementById('qr-code').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(secretMessage)}`;
        
        // Countdown
        const targetDate = new Date(data.Date);
        targetDate.setHours(0,0,0,0);
        
        const updateCountdown = () => {
            const now = new Date();
            now.setHours(0,0,0,0);
            const diffTime = targetDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            const cdEl = document.getElementById('countdown');
            if(diffDays > 0) cdEl.innerHTML = `Còn <strong>${diffDays} ngày</strong> nữa sẽ được gặp em ❤️`;
            else if(diffDays === 0) cdEl.innerHTML = `<strong>Hôm nay là ngày hẹn ❤️</strong>`;
            else cdEl.innerHTML = `Cuộc hẹn đã diễn ra ❤️`;
        };
        updateCountdown();
    }
};