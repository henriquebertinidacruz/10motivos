document.addEventListener('DOMContentLoaded', function () {
    const reasons = [
        {
            icon: '🍽️',
            text: 'Podemos comer algo bem gostoso juntos (e se for um dogão, dividimos).'
        },
        {
            icon: '💬',
            text: 'Vamos conversar sobre tudo que gostamos.'
        },
        {
            icon: '🚶‍♂️',
            text: 'Vamos nos exercitar e caminhar enquanto aproveitamos o ar fresco.'
        },
        {
            icon: '😌',
            text: 'Será um ótimo jeito de relaxar depois de um dia cansativo.'
        },
        {
            icon: '😂',
            text: 'Garanto que vamos dar muitas risadas durante o passeio.'
        },
        {
            icon: '🏠',
            text: 'Te levo na porta da sua casa no final, você fica segura e tranquila.'
        },
        {
            icon: '🗺️',
            text: 'Vamos falar sobre nossas experiências, viagens etc...'
        },
        {
            icon: '🎯',
            text: 'Vamos falar sobre projeções futuras, metas e tudo mais.'
        },
        {
            icon: '☀️',
            text: 'Não vai chover, liguei no escritório do céu e pedi para que não chovesse.'
        },
        {
            icon: '🧙‍♂️',
            text: 'No final nós dois sabemos que será agradável, dê uma chance para esse Jedi'
        }
    ];

    const reasonsContainer = document.getElementById('reasons');
    const lightsaberSound = document.getElementById('lightsaber');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const responseMessage = document.getElementById('responseMessage');

    reasons.forEach((reason, index) => {
        const reasonElement = document.createElement('div');
        reasonElement.className = 'reason';
        reasonElement.style.animation = `fadeIn 0.5s forwards ${index * 0.2 + 1}s`;

        reasonElement.innerHTML = `
            <div class="reason-number">Motivo #${index + 1}</div>
            <div class="reason-content">
                <div class="reason-icon">${reason.icon}</div>
                <p>${reason.text}</p>
            </div>
        `;

        reasonsContainer.appendChild(reasonElement);
    });

    function createStars() {
        const starsContainer = document.getElementById('stars');
        const count = Math.floor(window.innerHeight * window.innerWidth / 1000);

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 10}s`;
            starsContainer.appendChild(star);
        }
    }

    function createStarConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['⭐', '🌟', '✨', '💫', '☄️'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '0';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    acceptBtn.addEventListener('click', function () {
        lightsaberSound.play();
        responseMessage.innerHTML = '<p>Missão Aceita! Que a Força esteja conosco! 😊</p>';
        responseMessage.className = 'response-message success-message';
        responseMessage.style.display = 'block';
        
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 30px rgba(255, 232, 31, 0.8)';

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createStarConfetti();
            }, i * 200);
        }
    });

    rejectBtn.addEventListener('click', function () {
        lightsaberSound.play();
        responseMessage.innerHTML = '<p>Alarme do Império! Resposta não reconhecida! 😢</p>';
        responseMessage.className = 'response-message error-message';
        responseMessage.style.display = 'block';
        
        this.style.animation = 'shake 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });

    acceptBtn.addEventListener('mouseover', function () {
        lightsaberSound.currentTime = 0;
        lightsaberSound.play();
    });

    rejectBtn.addEventListener('mouseover', function () {
        lightsaberSound.currentTime = 0;
        lightsaberSound.play();
    });

    createStars();

    if (!document.querySelector('style[data-star-wars-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-star-wars-animations', '');
        style.innerHTML = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .star {
                position: absolute;
                background-color: white;
                border-radius: 50%;
                animation: twinkle 2s infinite alternate;
            }
        `;
        document.head.appendChild(style);
    }
});