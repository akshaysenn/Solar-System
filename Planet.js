class Planet {
    constructor({
        orbitSpeed = 1,
        orbitRadius = 1,
        orbitRotationDirection = "clockwise",
        planetSize = 1,
        planetAngle = 0,
        planetRotationSpeed = 1,
        planetRotationDirection = "clockwise",
        planetTexture = "/assets/textures/planets/mercury.jpg",
        rimHex = 0x0088ff,
        facingHex = 0x000000,
        rings = null,
        name = ""
    } = {}) {
        this.orbitSpeed = orbitSpeed;
        this.orbitRadius = orbitRadius;
        this.orbitRotationDirection = orbitRotationDirection;
        this.planetSize = planetSize;
        this.initialAngle = planetAngle;
        this.currentAngle = planetAngle;
        this.planetTexture = planetTexture;
        this.planetRotationSpeed = planetRotationSpeed;
        this.planetRotationDirection = planetRotationDirection;
        this.rings = rings;
        this.name = name;

        this.group = new THREE.Group();
        this.planetGroup = new THREE.Group();
        this.loader = new THREE.TextureLoader();
        this.planetGeometry = new THREE.IcosahedronGeometry(this.planetSize, 12);
        
        this.startTime = performance.now();

        this.createOrbit();
        this.createPlanet();
        this.createGlow(rimHex, facingHex);
        this.createRings();

        // Set initial position
        this.updatePosition();
    }

    createOrbit() {
        const orbitGeometry = new THREE.BufferGeometry();
        const points = [];
        const segments = 128;

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(
                Math.cos(theta) * this.orbitRadius,
                0,
                Math.sin(theta) * this.orbitRadius
            );
        }

        orbitGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(points, 3)
        );

        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x666666,
            transparent: true,
            opacity: 0.3,
        });

        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
        this.group.add(orbitLine);
    }

    updatePosition() {
        const elapsedTime = (performance.now() - this.startTime) * 0.001;
        this.currentAngle = this.initialAngle + (
            this.orbitRotationDirection === "clockwise" ? -1 : 1
        ) * this.orbitSpeed * elapsedTime;

        this.planetGroup.position.x = Math.cos(this.currentAngle) * this.orbitRadius;
        this.planetGroup.position.z = Math.sin(this.currentAngle) * this.orbitRadius;
    }

    update() {
        // Update orbit position
        this.updatePosition();

        // Update planet rotation
        const rotationAmount = this.planetRotationSpeed * (
            this.planetRotationDirection === "clockwise" ? -1 : 1
        );
        this.planetGroup.rotation.y += rotationAmount;
    }

    createPlanet() {
        const map = this.loader.load(this.planetTexture);
        const planetMaterial = new THREE.MeshPhongMaterial({ map });
        planetMaterial.map.colorSpace = THREE.SRGBColorSpace;
        const planetMesh = new THREE.Mesh(this.planetGeometry, planetMaterial);
        this.planetGroup.add(planetMesh);
        this.group.add(this.planetGroup);
    }

    createGlow(rimHex, facingHex) {
        const uniforms = {
            color1: { value: new THREE.Color(rimHex) },
            color2: { value: new THREE.Color(facingHex) },
            fresnelBias: { value: 0.2 },
            fresnelScale: { value: 1.5 },
            fresnelPower: { value: 4.0 }
        };

        const vertexShader = `
            uniform float fresnelBias;
            uniform float fresnelScale;
            uniform float fresnelPower;
            varying float vReflectionFactor;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
                vec3 I = worldPosition.xyz - cameraPosition;
                vReflectionFactor = fresnelBias + fresnelScale * pow(1.0 + dot(normalize(I), worldNormal), fresnelPower);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            uniform vec3 color1;
            uniform vec3 color2;
            varying float vReflectionFactor;
            void main() {
                float f = clamp(vReflectionFactor, 0.0, 1.0);
                gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
            }
        `;

        const planetGlowMaterial = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const planetGlowMesh = new THREE.Mesh(this.planetGeometry, planetGlowMaterial);
        planetGlowMesh.scale.setScalar(1.1);
        this.planetGroup.add(planetGlowMesh);
    }

    createRings() {
        if (!this.rings) return;

        const innerRadius = this.planetSize + 0.1;
        const outerRadius = innerRadius + this.rings.ringsSize;
        const ringsGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
        const ringsMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            map: this.loader.load(this.rings.ringsTexture)
        });

        const ringMesh = new THREE.Mesh(ringsGeometry, ringsMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        this.planetGroup.add(ringMesh);
    }

    getPlanet() {
        return this.group;
    }
} 