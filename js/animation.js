const Animations = {
    createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('floating-heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-20px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => { heart.remove(); }, 4000);
        }, 800);
    },

    typeWriter(text, elementId, callback) {
        let i = 0;
        const el = document.getElementById(elementId);
        el.innerHTML = '';
        const speed = 50;
        
        function type() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if(callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    },

    confetti() {
        // Simple CSS confetti logic for Vanilla JS
        for(let i=0; i<50; i++) {
            let conf = document.createElement('div');
            conf.innerHTML = ['🎉','❤️','✨','💖'][Math.floor(Math.random()*4)];
            conf.style.position = 'fixed';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = '-50px';
            conf.style.fontSize = Math.random() * 20 + 10 + 'px';
            conf.style.zIndex = 1000;
            conf.style.transition = 'all 2s ease-in';
            document.body.appendChild(conf);

            setTimeout(() => {
                conf.style.top = '100vh';
                conf.style.transform = `rotate(${Math.random()*360}deg) translateX(${Math.random()*100-50}px)`;
            }, 50);

            setTimeout(() => conf.remove(), 2000);
        }
    }
};