const space = document.getElementById('space');
const bodyCountEl = document.getElementById('body-count');
const totalMassEl = document.getElementById('total-mass');
const avgSpeedEl = document.getElementById('avg-speed');

let planetCount = 0;
let totalSystemMass = 1.0; // Sun's mass
let celestialBodies = [];

// Create animated star field
function createStarField() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = Math.random() * 3 + 1 + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Planet classification based on distance and physics
function getPlanetType(distance, isSpecial = false) {
    if (isSpecial) {
        return Math.random() > 0.5 ? 'comet' : 'asteroid';
    }
    if (distance < 90) return 'planet-small';
    if (distance < 180) return 'planet-medium';
    if (distance < 300) return 'planet-large';
    return Math.random() > 0.3 ? 'comet' : 'asteroid';
}

// Calculate orbital velocity based on distance (Kepler's laws)
function getOrbitalPeriod(distance) {
    // Simplified: T ∝ r^1.5 (Kepler's third law)
    const basePeriod = 3; // seconds for closest orbit
    return basePeriod * Math.pow(distance / 65, 1.5);
}

// Create gravitational wave effect
function createGravityWave(x, y) {
    if (!document.getElementById('gravity').checked) return;

    const wave = document.createElement('div');
    wave.className = 'gravity-wave';
    wave.style.left = x + 'px';
    wave.style.top = y + 'px';
    wave.style.width = '10px';
    wave.style.height = '10px';
    space.appendChild(wave);

    setTimeout(() => wave.remove(), 2000);
}

// Enhanced click handler with multiple interaction modes
function handleSpaceClick(e) {
    const rect = space.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Calculate distance from center (sun)
    const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);

    // Don't create bodies too close to sun
    if (distance < 35) return;

    // Create gravity wave effect
    createGravityWave(clickX, clickY);

    // Determine body type based on interaction
    let bodyType, bodySize, bodyMass;
    if (e.shiftKey) {
        // Shift+Click for special bodies
        bodyType = Math.random() > 0.5 ? 'comet' : 'asteroid';
        bodySize = bodyType === 'comet' ? 'planet-small' : 'asteroid';
        bodyMass = bodyType === 'comet' ? 0.1 : 0.05;
    } else if (e.button === 2) {
        // Right click for moons (smaller, faster)
        bodyType = 'moon';
        bodySize = 'moon';
        bodyMass = 0.02;
    } else {
        // Left click for regular planets
        bodyType = getPlanetType(distance);
        bodySize = bodyType;
        bodyMass = bodyType === 'planet-large' ? 0.5 : 
                  bodyType === 'planet-medium' ? 0.3 : 0.1;
    }

    // Create celestial body
    const body = document.createElement('div');
    body.className = `planet ${bodySize} ${bodyType}`;
    body.style.left = '50%';
    body.style.top = '50%';
    body.style.setProperty('--radius', distance + 'px');

    // Calculate realistic orbital period
    const orbitalPeriod = getOrbitalPeriod(distance);
    body.style.animationDuration = orbitalPeriod + 's';

    // Random starting position on orbit
    const startAngle = Math.random() * 360;
    body.style.animationDelay = -(startAngle / 360 * orbitalPeriod) + 's';

    // Add tooltip with orbital data
    const orbitalSpeed = Math.round(30 / Math.sqrt(distance / 65)); // Approximate km/s
    body.title = `Distance: ${Math.round(distance)}px | Period: ${orbitalPeriod.toFixed(1)}s | Speed: ${orbitalSpeed}km/s`;

    space.appendChild(body);

    // Store body data
    celestialBodies.push({
        element: body,
        distance: distance,
        mass: bodyMass,
        period: orbitalPeriod,
        type: bodyType
    });

    // Enhanced trail system
    const createTrail = () => {
        if (body.parentNode && !document.getElementById('clear').checked && 
            !document.getElementById('pause').checked) {
            const trail = document.createElement('div');
            trail.className = 'trail';
            trail.style.color = window.getComputedStyle(body).color;

            // Get current body position
            const bodyRect = body.getBoundingClientRect();
            const spaceRect = space.getBoundingClientRect();
            trail.style.left = (bodyRect.left - spaceRect.left + bodyRect.width/2) + 'px';
            trail.style.top = (bodyRect.top - spaceRect.top + bodyRect.height/2) + 'px';

            space.appendChild(trail);

            // Remove trail after animation
            setTimeout(() => trail.remove(), 3000);

            // Schedule next trail with variable timing
            const trailInterval = bodyType === 'comet' ? 100 : 
                                 bodyType === 'moon' ? 150 : 200;
            setTimeout(createTrail, trailInterval);
        }
    };

    // Start creating trails
    setTimeout(createTrail, 500);

    planetCount++;
    totalSystemMass += bodyMass;
    updateStats();
}

// Update system statistics
function updateStats() {
    bodyCountEl.textContent = planetCount;
    totalMassEl.textContent = totalSystemMass.toFixed(2);

    // Calculate average orbital speed
    if (celestialBodies.length > 0) {
        const avgSpeed = celestialBodies.reduce((sum, body) => 
            sum + (30 / Math.sqrt(body.distance / 65)), 0) / celestialBodies.length;
        avgSpeedEl.textContent = Math.round(avgSpeed);
    } else {
        avgSpeedEl.textContent = '0';
    }
}

// Event listeners
space.addEventListener('click', handleSpaceClick);
space.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleSpaceClick(e);
});

// Clear functionality
document.getElementById('clear').addEventListener('change', function(e) {
    if (e.target.checked) {
        const planets = space.querySelectorAll('.planet');
        const trails = space.querySelectorAll('.trail');
        planets.forEach(planet => planet.remove());
        trails.forEach(trail => trail.remove());
        celestialBodies = [];
        planetCount = 0;
        totalSystemMass = 1.0;
        updateStats();

        setTimeout(() => {
            e.target.checked = false;
        }, 500);
    }
});

// Gravity toggle (affects visual feedback)
document.getElementById('gravity').addEventListener('change', function(e) {
    const orbits = space.querySelectorAll('.orbit-path');
    if (e.target.checked) {
        orbits.forEach(orbit => orbit.style.display = 'block');
    } else {
        orbits.forEach(orbit => orbit.style.display = 'none');
    }
});

// Initialize
createStarField();
updateStats();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'c':
        case 'C':
            document.getElementById('clear').click();
            break;
        case ' ':
            e.preventDefault();
            document.getElementById('pause').click();
            break;
        case 'g':
        case 'G':
            document.getElementById('gravity').click();
            break;
    }
});