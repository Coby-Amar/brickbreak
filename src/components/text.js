import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export class Text {
    mesh = null

    constructor(position = { x: 0, y: 0, z: 0, }, color = '#D2A161') {
        const geometry = new TextGeometry(830, 30, 30)
        const material = new MeshPhongMaterial({ color: color })
        const mesh = new Mesh(geometry, material)
        // const { x, y, z } = position
        // mesh.position.set(x, y, z)
        this.mesh = mesh
        // this.box = new Box3().setFromObject(mesh)
    }
}