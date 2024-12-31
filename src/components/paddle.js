import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";

export class Paddle {
    mesh = null
    _box = null

    constructor(position = { x: 0, y: 0, z: 0, }, color = '#D7CAB0') {
        const geometry = new BoxGeometry(150, 20, 30)
        const material = new MeshPhongMaterial({ color: color })
        const mesh = new Mesh(geometry, material)
        const { x, y, z } = position
        mesh.position.set(x, y, z)
        this.mesh = mesh
        this._box = new Box3().setFromObject(mesh).
    }
    get box() {
        this._box = this._box.setFromObject(this.mesh)
        return this._box
    }
    get boxCorners() {
        const box = this.box
        return [
            new Vector3(box.min.x, box.min.y, box.min.z), // 0 - left bottom back corner
            new Vector3(box.max.x, box.min.y, box.min.z), // 1 - right bottom back corner
            new Vector3(box.min.x, box.min.y, box.max.z), // 2 - left bottom front corner
            new Vector3(box.max.x, box.min.y, box.max.z), // 3 - right bottom front corner
            new Vector3(box.min.x, box.max.y, box.min.z), // 4 - left top back corner
            new Vector3(box.max.x, box.max.y, box.min.z), // 5 - right top back corner
            new Vector3(box.min.x, box.max.y, box.max.z), // 6 - left top front corner
            new Vector3(box.max.x, box.max.y, box.max.z)  // 7 - right top front corner
        ]
    }
    get boxEdges() {
        const corners = this.boxCorners
        return [
            [corners[0], corners[1]], [corners[1], corners[3]], [corners[3], corners[2]], [corners[2], corners[0]], // Bottom edges
            [corners[4], corners[5]], [corners[5], corners[7]], [corners[7], corners[6]], [corners[6], corners[4]], // Top edges
            [corners[0], corners[4]], [corners[1], corners[5]], [corners[2], corners[6]], [corners[3], corners[7]], // Vertical edges
        ];
    }
    get position() {
        return this.mesh.position
    }
    set position({ x, y, z, }) {
        this.mesh.position.set(x, y, z)
    }
    onCollision(ballSphere) {
        return this.boxEdges.find(([start, end]) => {
            const edgeDirection = new Vector3().subVectors(end, start).normalize();
            const edgeToSphere = new Vector3().subVectors(ballSphere.center, start);
            const projection = edgeToSphere.dot(edgeDirection);
            const clampedProjection = Math.max(0, Math.min(projection, start.distanceTo(end)));
            const closestPoint = new Vector3().copy(edgeDirection).multiplyScalar(clampedProjection).add(start);
            return closestPoint.distanceTo(ballSphere.center) < ballSphere.radius
        }).length > 0
    }
}