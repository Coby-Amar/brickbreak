import { Box3, Vector3 } from "three"
import { Sphere } from "three"
import { GAME_BOARD } from "./state"

export function movePaddle() {
    const { paddle, paddleDirection, walls } = GAME_BOARD
    const { left, right } = walls
    const paddleBox = new Box3().setFromObject(paddle)
    console.log('paddleBox.intersectsBox(left): ', paddleBox.intersectsBox(left))
    if (paddleBox.intersectsBox(left) || paddleBox.intersectsBox(right)) {
        console.log('intersectsBox')
        GAME_BOARD.paddleDirection = 0
    }
    paddle.position.x += paddleDirection.x
}

export function moveBall() {
    const { ball, ballResetPosition, ballState, paddle, walls } = GAME_BOARD

    const ballBox = new Sphere(new Vector3(ball.position.x, ball.position.y, ball.position.z), 3)
    const paddleBox = new Box3().setFromPoints(new Vector3(paddle.position.x, paddle.position.y, paddle.position.z))

    const { top, left, right, limit } = walls
    // if (ballBox.intersectsBox(limit)) {
    //     ballState.reset()
    //     ball.position.set(ballResetPosition.x, ballResetPosition.y, ballResetPosition.z)
    //     paddle.position.x = 0
    //     return true
    // }
    if (ballBox.intersectsBox(top) || ballBox.intersectsBox(paddleBox)) {
        ballState.reverseY()
    }
    if (ballBox.intersectsBox(left) || ballBox.intersectsBox(right)) {
        ballState.reverseX()
    }
    ball.position.x += ballState.x
    ball.position.y += ballState.y
    return false
}
