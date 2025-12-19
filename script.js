document.addEventListener('DOMContentLoaded', () => {
    console.log('Misha Wrapped 2025 Loaded');

    // Observer for scroll animations
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                console.log('Section in view:', entry.target.id);

                // Trigger specific animations
                if (entry.target.id === 'age') {
                    animateValue("age-value", 0, 15, 2000);
                }

                if (entry.target.id === 'outro') {
                    startConfetti();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Random rotation for photos
    document.querySelectorAll('.photo-item img').forEach(img => {
        const randomRotation = (Math.random() - 0.5) * 15; // Increased rotation
        img.style.setProperty('--rotation', `${randomRotation}deg`);
        // Random scale for more chaotic look
        const randomScale = 0.9 + Math.random() * 0.2;
        img.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
    });

    // Button Interaction
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('age').scrollIntoView({ behavior: 'smooth' });
    });

    // 3D Tilt Effect removed for cleaner experience, relying on CSS hover
});

function animateValue(id, start, end, duration) {
    const obj = document.querySelector('.big-number'); // Selecting class instead of ID for now as ID wasn't set, or I should update HTML
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

function startConfetti() {
    const container = document.querySelector('.confetti-container');
    if (container.childElementCount > 0) return; // Prevent duplicates

    const colors = ['#1DB954', '#6836F9', '#EFF0EB', '#E91E63'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        confetti.style.animation = `fall ${duration}s linear ${delay}s infinite`;

        container.appendChild(confetti);
    }

    // Create style for fall animation dynamically or add to CSS
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
