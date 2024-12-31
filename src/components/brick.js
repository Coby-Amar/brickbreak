import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
export class Brick {
    static _brickWidth = 50
    static _brickHeight = 20
    static _brickDepth = 30
    health = 0
    worth = 0
    mesh = null
    box = null
    boxCorners = null
    boxEdges = null

    constructor(position = { x: 0, y: 0, z: 0, }, options = { health: 1, color: '#6A2E2A' }) {
        const geometry = new BoxGeometry(Brick._brickWidth, Brick._brickHeight, Brick._brickDepth)
        const material = new MeshPhongMaterial({ color: options.color })
        const mesh = new Mesh(geometry, material)
        const { x, y, z } = position
        mesh.position.set(x, y, z)
        this.health = options.health
        this.mesh = mesh
        const box = new Box3().setFromObject(mesh)
        this.box = box
        const corners = [
            new Vector3(box.min.x, box.min.y, box.min.z), // 0 - left bottom back corner
            new Vector3(box.max.x, box.min.y, box.min.z), // 1 - right bottom back corner
            new Vector3(box.min.x, box.min.y, box.max.z), // 2 - left bottom front corner
            new Vector3(box.max.x, box.min.y, box.max.z), // 3 - right bottom front corner
            new Vector3(box.min.x, box.max.y, box.min.z), // 4 - left top back corner
            new Vector3(box.max.x, box.max.y, box.min.z), // 5 - right top back corner
            new Vector3(box.min.x, box.max.y, box.max.z), // 6 - left top front corner
            new Vector3(box.max.x, box.max.y, box.max.z)  // 7 - right top front corner
        ]
        this.boxCorners = corners
        this.boxEdges = [
            [corners[0], corners[1]], [corners[1], corners[3]], [corners[3], corners[2]], [corners[2], corners[0]], // Bottom edges
            [corners[4], corners[5]], [corners[5], corners[7]], [corners[7], corners[6]], [corners[6], corners[4]], // Top edges
            [corners[0], corners[4]], [corners[1], corners[5]], [corners[2], corners[6]], [corners[3], corners[7]], // Vertical edges
        ]
    }
    get position() {
        return this.mesh.position
    }
    onCollision() {
        this.health -= 1
        if (this.health < 0) {
            throw Error('Break already dead shouldn\'t be hit')
        }
        if (this.health === 0) {
            return true
        }
        return false
    }
}