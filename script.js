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

    function cycleTheme() {
        // Remove current theme
        appContainer.classList.remove(themes[currentThemeIndex].class);

        // Advance to next
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;

        // Add new theme
        appContainer.classList.add(themes[currentThemeIndex].class);
        faceNameDisplay.innerText = themes[currentThemeIndex].name;
    }

    // Cycle themes every 15 seconds automatically for digital signage
    setInterval(cycleTheme, 15000);
});