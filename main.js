let solarSystem;
let raycaster;
let mouse;
let selectedObject = null;

function init() {
    const container = document.getElementById('canvas-container');
    solarSystem = new SolarSystem(container);
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    document.getElementById('close-btn').addEventListener('click', closeInfoPanel);

    // Start animation
    animate();
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick() {
    raycaster.setFromCamera(mouse, solarSystem.camera);
    const intersects = raycaster.intersectObjects(solarSystem.scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        const planetGroup = object.parent.parent;
        
        if (planetGroup && planetGroup.userData) {
            showInfoPanel(planetGroup);
        }
    }
}

function showInfoPanel(planetGroup) {
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    
    if (planetGroup.userData.type === 'sun') {
        const info = planetGroup.userData.info;
        content.innerHTML = `
            <h2>${info.name}</h2>
            <h3>${info.title}</h3>
            <p>Email: <a href="mailto:${info.email}">${info.email}</a></p>
            <p>
                <a href="${info.github}" target="_blank">GitHub</a> |
                <a href="${info.linkedin}" target="_blank">LinkedIn</a>
            </p>
        `;
    } else {
        content.innerHTML = `
            <h2>${planetGroup.userData.name || 'Planet'}</h2>
            <p>Click to see details</p>
        `;
    }
    
    panel.classList.add('visible');
}

function closeInfoPanel() {
    const panel = document.getElementById('info-panel');
    panel.classList.remove('visible');
    
    if (selectedObject) {
        selectedObject.deselect();
        selectedObject = null;
    }
}

function animate() {
    requestAnimationFrame(animate);
    solarSystem.animate();
}

// Initialize when the page loads
window.addEventListener('load', init); 