class SolarSystem {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.sun = null;
        this.planets = [];
        this.stars = null;
        this.controls = null;

        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera
        this.setupCamera();
        this.setupControls();

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 0, 0);
        this.scene.add(ambientLight);
        this.scene.add(pointLight);

        // Create stars
        this.stars = new Stars({ numStars: 2000 });
        this.scene.add(this.stars.getStarfield());

        // Create sun
        this.createSun();

        // Create planets
        this.createPlanets();

        // Add event listeners
        // window.addEventListener('resize', () => this.onWindowResize());
    }

    setupCamera() {
        // Set camera to 45-degree view
        const distance = 150;
        const angle = Math.PI / 4; // 45 degrees
        this.camera.position.set(
            distance * Math.cos(angle),
            distance * Math.sin(angle),
            distance * Math.cos(angle)
        );
        this.camera.lookAt(0, 0, 0);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        
        // Disable rotation
        this.controls.enableRotate = false;
        
        // Allow only zooming
        this.controls.enableZoom = true;
        this.controls.minDistance = 50;
        this.controls.maxDistance = 200;
        
        // Disable panning
        this.controls.enablePan = false;
    }

    createSun() {
        const sunConfig = {
            orbitRadius: 0,
            planetSize: 8,
            planetTexture: '/assets/textures/sun.jpg',
            planetRotationSpeed: 0.0002,
            rimHex: 0xffdd00,
            facingHex: 0xff8800
        };
        
        this.sun = new Planet(sunConfig);
        const sunGroup = this.sun.getPlanet();
        sunGroup.userData.type = 'sun';
        sunGroup.userData.info = {
            name: "Your Name",
            title: "Full Stack Developer",
            email: "your.email@example.com",
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername"
        };
        this.scene.add(sunGroup);
    }

    createPlanets() {
        const planetConfigs = [
            {
                name: 'Mercury',
                orbitRadius: 15,
                planetSize: 1.2,
                planetTexture: '/assets/textures/mercury.jpg',
                orbitSpeed: 0.47,
                planetRotationSpeed: 0.02,
                rimHex: 0x888888
            },
            {
                name: 'Venus',
                orbitRadius: 20,
                planetSize: 1.8,
                planetTexture: '/assets/textures/venus.jpg',
                orbitSpeed: 0.35,
                planetRotationSpeed: 0.015,
                rimHex: 0xe39e1c
            },
            {
                name: 'Earth',
                orbitRadius: 26,
                planetSize: 2.0,
                planetTexture: '/assets/textures/earth.jpg',
                orbitSpeed: 0.29,
                planetRotationSpeed: 0.02,
                rimHex: 0x2277ff
            },
            {
                name: 'Mars',
                orbitRadius: 32,
                planetSize: 1.5,
                planetTexture: '/assets/textures/mars.jpg',
                orbitSpeed: 0.24,
                planetRotationSpeed: 0.018,
                rimHex: 0xff4422
            },
            {
                name: 'Jupiter',
                orbitRadius: 42,
                planetSize: 4.0,
                planetTexture: '/assets/textures/jupiter.jpg',
                orbitSpeed: 0.13,
                planetRotationSpeed: 0.04,
                rimHex: 0xd3ad7c
            },
            {
                name: 'Saturn',
                orbitRadius: 52,
                planetSize: 3.5,
                planetTexture: '/assets/textures/saturn.jpg',
                orbitSpeed: 0.097,
                planetRotationSpeed: 0.038,
                rimHex: 0xead6b8,
                rings: {
                    ringsTexture: '/assets/textures/saturn_rings.png',
                    ringsSize: 3
                }
            },
            {
                name: 'Uranus',
                orbitRadius: 62,
                planetSize: 2.5,
                planetTexture: '/assets/textures/uranus.jpg',
                orbitSpeed: 0.068,
                planetRotationSpeed: 0.03,
                rimHex: 0x99ccff
            },
            {
                name: 'Neptune',
                orbitRadius: 72,
                planetSize: 2.4,
                planetTexture: '/assets/textures/neptune.jpg',
                orbitSpeed: 0.054,
                planetRotationSpeed: 0.032,
                rimHex: 0x3344ff
            },
            {
                name: 'Pluto',
                orbitRadius: 82,
                planetSize: 0.8,
                planetTexture: '/assets/textures/pluto.jpg',
                orbitSpeed: 0.047,
                planetRotationSpeed: 0.008,
                rimHex: 0x888888
            }
        ];

        planetConfigs.forEach(config => {
            const planet = new Planet(config);
            this.planets.push(planet);
            this.scene.add(planet.getPlanet());
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update planets
        this.planets.forEach(planet => planet.update());
        if (this.sun) this.sun.update();
        if (this.stars) this.stars.update();

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
} 