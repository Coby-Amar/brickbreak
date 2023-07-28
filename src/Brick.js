import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three'

const WIDTH = 10;
const HEIGHT = 4;
const DEPTH = 10;

export function Brick(x, y) {
    const geometry = new BoxGeometry(WIDTH, HEIGHT, DEPTH)
    const material = new MeshPhongMaterial({ color: '#FFF' })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    return mesh
}