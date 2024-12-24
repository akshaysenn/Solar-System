class Stars {
    constructor({ numStars = 1000 } = {}) {
        this.numStars = numStars;
        this.group = new THREE.Group();
        this.loader = new THREE.TextureLoader();
        this.createStarfield();
        this.createStaticBackground();
    }

    createStarfield() {
        const verts = [];
        const colors = [];
        const positions = [];

        for (let i = 0; i < this.numStars; i++) {
            let p = this.getRandomSpherePoint();
            const { pos, hue } = p;
            positions.push(p);
            const col = new THREE.Color().setHSL(hue, 0.2, Math.random());
            verts.push(pos.x, pos.y, pos.z);
            colors.push(col.r, col.g, col.b);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.2,
            alphaTest: 0.5,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            map: this.loader.load('/assets/textures/circle.png')
        });

        const points = new THREE.Points(geometry, material);
        this.group.add(points);
    }

    createStaticBackground() {
        // Create a large sphere for background stars
        const backgroundGeometry = new THREE.BufferGeometry();
        const backgroundVerts = [];
        const backgroundColors = [];
        
        // Create more stars for the background
        const backgroundStars = 5000;
        
        for (let i = 0; i < backgroundStars; i++) {
            // Place stars on a very large sphere
            const radius = 900; // Large radius for background
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            backgroundVerts.push(x, y, z);
            
            // Random star brightness
            const brightness = 0.3 + Math.random() * 0.7;
            backgroundColors.push(brightness, brightness, brightness);
        }
        
        backgroundGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(backgroundVerts, 3)
        );
        backgroundGeometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(backgroundColors, 3)
        );
        
        const backgroundMaterial = new THREE.PointsMaterial({
            size: 1,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            map: this.loader.load('/assets/textures/circle.png'),
            depthWrite: false
        });
        
        const backgroundStarfield = new THREE.Points(backgroundGeometry, backgroundMaterial);
        this.group.add(backgroundStarfield);
    }

    getRandomSpherePoint() {
        const radius = Math.random() * 25 + 25;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return {
            pos: new THREE.Vector3(x, y, z),
            hue: 0.6,
            minDist: radius
        };
    }

    update() {
        if (this.group) {
            // Only rotate the inner starfield, not the background
            const innerStarfield = this.group.children[0];
            innerStarfield.rotation.y += 0.00005;
        }
    }

    getStarfield() {
        return this.group;
    }
} 