import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three'

export const PADDLE_WIDTH = 30
export const PADDLE_HEIGHT = 5

export function Paddle(x, y) {
    const geometry = new BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, 10)
    const material = new MeshPhongMaterial({ color: '#FFF' })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    return mesh
}