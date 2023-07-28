import { getLeftLimit, getPaddleLeft, getPaddleRight, getRightLimit, getWindowCenterX } from "./UTILS"

let PaddleDirectionAndSpeed = 0

export function onMouseMove(event, camera, paddle, RIGHT_WALL_X, LEFT_WALL_X) {
    const mouseX = event.clientX - getWindowCenterX()
    const currentPaddlePositionX = paddle.position.x + getWindowCenterX() + camera.position.x
    const paddleRight = getPaddleRight(currentPaddlePositionX)
    const paddleLeft = getPaddleLeft(currentPaddlePositionX)
    console.log('currentPaddlePositionX', event.clientX)
    console.log('mouseX: ', event.clientX)
    console.log('paddle.position.distanceTo(camera.position): ', paddle.position.distanceTo(camera.position))
    console.log('getWindowCenterX(): ', getWindowCenterX())
    // if (mouseX > paddleRight) {
    //     if (paddleRight >= getRightLimit(RIGHT_WALL_X)) {
    //         PaddleDirectionAndSpeed = 0
    //     } else {
    //         PaddleDirectionAndSpeed = 0.5
    //     }
    // } else if (mouseX < paddleLeft) {
    //     if (paddleLeft <= -getLeftLimit(LEFT_WALL_X)) {
    //         PaddleDirectionAndSpeed = 0
    //     } else {
    //         PaddleDirectionAndSpeed = -0.5
    //     }
    // }
}

export function movePaddle(paddle, RIGHT_WALL_X, LEFT_WALL_X) {
    const currentPaddlePositionX = paddle.position.x
    const isRight = PaddleDirectionAndSpeed > 0
    if (isRight && getPaddleRight(currentPaddlePositionX) >= getRightLimit(RIGHT_WALL_X)) {
        return
    }
    if (!isRight && getPaddleLeft(currentPaddlePositionX) <= getLeftLimit(LEFT_WALL_X)) {
        return
    }
    paddle.position.x += PaddleDirectionAndSpeed
}
