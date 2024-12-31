import { Sphere, SphereGeometry, Mesh, MeshPhongMaterial } from "three";

export class Ball {
    mesh = null
    _box = null

    constructor(position = { x: 0, y: 0, z: 0, }, color = '#FAE500') {
        const geometry = new SphereGeometry(25)
        const material = new MeshPhongMaterial({ color: color })
        const mesh = new Mesh(geometry, material)
        const { x, y, z } = position
        mesh.position.set(x, y, z)

        this.mesh = mesh
        this._box = new Sphere(mesh.position, 25)
    }
    get sphere() {
        const ballPosition = this.mesh.position
        this._box.set(ballPosition, 25)
        return this._box
    }
    set position({ x, y, z, }) {
        this.mesh.position.set(x, y, z)
    }
    onCollision() {
        return false
    }
}