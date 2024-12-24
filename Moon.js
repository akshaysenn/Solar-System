class Moon extends CelestialObject {
    constructor(radius, color, orbitRadius, parent, projectData) {
        super(radius, color, new THREE.Vector3());
        this.orbitRadius = orbitRadius;
        this.parent = parent;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitSpeed = 0.002;
        this.projectData = projectData;
        this.visible = false;
    }

    createMesh() {
        const mesh = super.createMesh();
        mesh.userData.type = 'moon';
        mesh.userData.object = this;
        mesh.visible = this.visible;
        return mesh;
    }

    update(parentPosition) {
        this.angle += this.orbitSpeed;
        
        // Calculate position relative to parent planet
        this.mesh.position.x = parentPosition.x + Math.cos(this.angle) * this.orbitRadius;
        this.mesh.position.y = parentPosition.y;
        this.mesh.position.z = parentPosition.z + Math.sin(this.angle) * this.orbitRadius;
    }

    show() {
        this.visible = true;
        this.mesh.visible = true;
    }

    hide() {
        this.visible = false;
        this.mesh.visible = false;
    }
} 