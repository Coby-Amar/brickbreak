import { SphereGeometry, MeshPhongMaterial, Mesh } from 'three'

export const BALL_RADIUS = 2.5
export const BALL_WIDTH = BALL_RADIUS * 2
export const BALL_HEIGHT = BALL_RADIUS * 2

export function Ball(x, y) {
    const sphereGeometry = new SphereGeometry(BALL_RADIUS, 64, 32)
    const meshStandardMaterial = new MeshPhongMaterial({ color: 0x919494 })
    const mesh = new Mesh(sphereGeometry, meshStandardMaterial)
    mesh.position.x = x
    mesh.position.y = y
    return mesh
}