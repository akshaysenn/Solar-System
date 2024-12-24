class CelestialObject {
    constructor(radius, color, position) {
        this.radius = radius;
        this.color = color;
        this.position = position;
        this.mesh = null;
    }

    createMesh() {
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        let material;

        material = new THREE.MeshPhongMaterial({
            color: this.color,
            emissive: this.color,
            emissiveIntensity: 0.2
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);

        return this.mesh;
    }

    update() {
        // Base update method to be overridden
    }
} 