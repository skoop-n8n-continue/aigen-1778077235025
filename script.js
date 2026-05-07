document.addEventListener('DOMContentLoaded', () => {
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const markersContainer = document.getElementById('markers');
    const appContainer = document.getElementById('app-container');
    const faceNameDisplay = document.getElementById('face-name');

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
        { class: 'face-classic', name: 'Classic Face' },
        { class: 'face-dark', name: 'Dark Mode' },
        { class: 'face-minimal', name: 'Minimalist' },
        { class: 'face-neon', name: 'Neon Cyberpunk' }
    ];
    let currentThemeIndex = 0;

    const themeBtns = document.querySelectorAll('.theme-btn');
    const cycleInfo = document.getElementById('cycle-info');

    function setTheme(index) {
        appContainer.classList.remove(themes[currentThemeIndex].class);
        currentThemeIndex = index;
        appContainer.classList.add(themes[currentThemeIndex].class);
        faceNameDisplay.innerText = themes[currentThemeIndex].name;

        // Update active button
        themeBtns.forEach((btn, i) => {
            if (i === index) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    function cycleTheme() {
        setTheme((currentThemeIndex + 1) % themes.length);
    }

    // Cycle themes every 15 seconds automatically for digital signage
    let autoCycleInterval = setInterval(cycleTheme, 15000);

    // Handle manual selection
    themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            setTheme(index);

            // Stop automatic cycle on manual selection
            clearInterval(autoCycleInterval);
            cycleInfo.innerText = "Manual mode (Auto-cycle paused)";
        });
    });
});