document.addEventListener('DOMContentLoaded', () => {
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const markersContainer = document.getElementById('markers');
    const appContainer = document.getElementById('app-container');
    const faceNameDisplay = document.getElementById('face-name');
    const clockElement = document.getElementById('clock-element');
    const effectsLayer = document.getElementById('effects-layer');

    // Generate markers (1 to 12)
    for (let i = 1; i <= 60; i++) {
        const marker = document.createElement('div');
        marker.className = 'marker';

        // Every 5th marker is a main hour marker
        if (i % 5 === 0) {
            marker.classList.add('main');

            // Add numbers
            const text = document.createElement('div');
            text.className = 'marker-text';
            text.innerText = (i / 5).toString();
            // Rotate text back so it stands upright
            text.style.transform = `translateX(-50%) rotate(-${i * 6}deg)`;
            marker.appendChild(text);
        }

        marker.style.transform = `rotate(${i * 6}deg)`;
        markersContainer.appendChild(marker);
    }

    // Clock updating logic
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        // Calculate angles (smooth movement for seconds)
        const secondsAngle = (seconds + milliseconds / 1000) * 6;
        const minutesAngle = (minutes + seconds / 60) * 6;
        const hoursAngle = ((hours % 12) + minutes / 60) * 30;

        // Apply rotation
        secondHand.style.transform = `rotate(${secondsAngle}deg)`;
        minuteHand.style.transform = `rotate(${minutesAngle}deg)`;
        hourHand.style.transform = `rotate(${hoursAngle}deg)`;

        requestAnimationFrame(updateClock);
    }

    // Start clock
    updateClock();

    // Theme Management
    const themes = [
        { class: 'face-classic', bgClass: 'bg-classic', name: 'Classic Face' },
        { class: 'face-dark', bgClass: 'bg-dark', name: 'Dark Mode' },
        { class: 'face-minimal', bgClass: 'bg-minimal', name: 'Minimalist' },
        { class: 'face-neon', bgClass: 'bg-neon', name: 'Neon Cyberpunk' }
    ];
    let currentThemeIndex = 0;

    const themeDropdown = document.getElementById('theme-dropdown');
    const cycleInfo = document.getElementById('cycle-info');

    function setTheme(index) {
        appContainer.classList.remove(themes[currentThemeIndex].class);
        document.getElementById("bg-effects").className = "";
        currentThemeIndex = index;
        appContainer.classList.add(themes[currentThemeIndex].class);
        document.getElementById("bg-effects").classList.add(themes[currentThemeIndex].bgClass);
        faceNameDisplay.innerText = themes[currentThemeIndex].name;

        // Update dropdown
        themeDropdown.value = index.toString();
    }

    function cycleTheme() {
        setTheme((currentThemeIndex + 1) % themes.length);
    }

    // Cycle themes every 15 seconds automatically for digital signage
    let autoCycleInterval = setInterval(cycleTheme, 15000);

    // Handle manual selection
    themeDropdown.addEventListener('change', (e) => {
        const index = parseInt(e.target.value);
        setTheme(index);

        // Stop automatic cycle on manual selection
        clearInterval(autoCycleInterval);
        cycleInfo.innerText = "Manual mode (Auto-cycle paused)";
    });

    // Random Animations Logic
    function triggerRandomAnimation() {
        const theme = themes[currentThemeIndex].class;

        // Clear previous effects
        effectsLayer.innerHTML = '';
        clockElement.classList.remove('neon-glitch');

        if (theme === 'face-classic') {
            // Sweep reflection
            const glint = document.createElement('div');
            glint.className = 'classic-glint';
            effectsLayer.appendChild(glint);
            setTimeout(() => glint.remove(), 1500);

        } else if (theme === 'face-dark') {
            // Shooting star
            const star = document.createElement('div');
            star.className = 'dark-star';

            // Random position in the upper right quadrant
            const top = Math.random() * 30 + 10;
            const right = Math.random() * 30 + 10;

            star.style.top = `${top}%`;
            star.style.right = `${right}%`;

            effectsLayer.appendChild(star);
            setTimeout(() => star.remove(), 1000);

        } else if (theme === 'face-minimal') {
            // Center ripple
            const ripple = document.createElement('div');
            ripple.className = 'minimal-ripple';
            effectsLayer.appendChild(ripple);
            setTimeout(() => ripple.remove(), 2000);

        } else if (theme === 'face-neon') {
            // Glitch effect on the clock wrapper
            clockElement.classList.add('neon-glitch');
            setTimeout(() => {
                clockElement.classList.remove('neon-glitch');
            }, 300); // Glitch for 300ms
        }

        // Schedule next random animation
        const nextTime = Math.random() * 4000 + 2000; // Random time between 2 to 6 seconds
        setTimeout(triggerRandomAnimation, nextTime);
    }

    // Start random animations
    setTimeout(triggerRandomAnimation, 3000);
});