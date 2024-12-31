import { Box3, BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export class WallPost {
    mesh = null
    box = null

    constructor(position = { x: 0, y: 0, z: 0, }, color = '#D2A161') {
        const geometry = new BoxGeometry(30, 500, 30)
        const material = new MeshPhongMaterial({ color: color })
        const mesh = new Mesh(geometry, material)
        const { x, y, z } = position
        mesh.position.set(x, y, z)
        this.mesh = mesh
        this.box = new Box3().setFromObject(mesh)
    }
    onCollision() {
        return false
    }
}