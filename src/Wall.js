import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three'

export const WALL_WIDTH = 10
export const WALL_HEIGHT = 150


export function Wall(x, y, arg = {}) {
    const { width = WALL_WIDTH, height = WALL_HEIGHT } = arg
    const geometry = new BoxGeometry(width, height, 10)
    const material = new MeshLambertMaterial({ color: 0xB57EDC })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    return mesh
}