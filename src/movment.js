import { Box3, Vector3 } from "three"
import { GameBoard } from "./gameBoard"
// import { gameBoard } from "./main"

export class PaddleMovement {
    _paddleVelocity = new Vector3(0, 0, 0)
    _left = false
    _right = false
    _up = false
    _down = false
    move(paddlePosition) {
        paddlePosition.add(this._paddleVelocity)
    }
    setLeft() {
        this.reset()
        this._paddleVelocity.x = -2
        this._left = true
    }
    setRight() {
        this.reset()
        this._paddleVelocity.x = 2
        this._right = true
    }
    increasePaddleVelocity() {
        this._paddleVelocity.x = this._paddleVelocity.x + (this._paddleVelocity.x * 0.1)
        this._paddleVelocity.y = this._paddleVelocity.y + (this._paddleVelocity.y * 0.1)
        // this._paddleVelocity.z += .5
    }
    reset() {
        this._paddleVelocity.x = 0
        this._left = false
        this._right = false
        this._up = false
        this._down = false
    }
}

const _ballVelocity = new Vector3(1, .5, 0)
export class BallMovements {
    ballVelocity = _ballVelocity.clone()
    reverseX() {
        this.ballVelocity.x *= -1
    }
    reverseY() {
        this.ballVelocity.y *= -1
    }
    reverseZ() {
        this.ballVelocity.z *= -1
    }
    increaseBallVelocity() {
        this.ballVelocity.x = this.ballVelocity.x + (this.ballVelocity.x * 0.1)
        this.ballVelocity.y = this.ballVelocity.y + (this.ballVelocity.y * 0.1)
        // this.ballVelocity.z += .5
    }
    reset() {
        this.ballVelocity = _ballVelocity.clone()
    }
}

// export class Movments {
//     static paddleMovements = new _PaddleMovement()
//     static ballMovements = new _BallMovements()
//     static movePaddle() {
//         const paddlePosition = GameBoard.stage.paddle.mesh.position
//         const paddleBox = GameBoard.stage.paddle.box
//         const { left, right } = GameBoard.stage.walls
//         if (this.paddleMovements._left) {
//             if (paddleBox.intersectsBox(left.box)) {
//                 this.paddleMovements.reset()
//                 return
//             }
//             this.paddleMovements.move(paddlePosition)
//         }
//         if (this.paddleMovements._right) {
//             if (paddleBox.intersectsBox(right.box)) {
//                 this.paddleMovements.reset()
//                 return
//             }
//             this.paddleMovements.move(paddlePosition)
//         }
//     }
//     static moveBall() {
//         const ballPosition = GameBoard.stage.ball.mesh.position
//         const ballSphere = GameBoard.stage.ball.sphere
//         const ballVelocity = this.ballMovements.ballVelocity
//         const paddle = GameBoard.stage.paddle
//         if (ballSphere.intersectsBox(paddle.box)) {
//             const edgeHit = paddle.boxEdges.find(([start, end]) => {
//                 const edgeDirection = new Vector3().subVectors(end, start).normalize();
//                 const edgeToSphere = new Vector3().subVectors(ballSphere.center, start);
//                 const projection = edgeToSphere.dot(edgeDirection);
//                 const clampedProjection = Math.max(0, Math.min(projection, start.distanceTo(end)));
//                 const closestPoint = new Vector3().copy(edgeDirection).multiplyScalar(clampedProjection).add(start);
//                 return closestPoint.distanceTo(ballSphere.center) < ballSphere.radius
//             })
//             if (edgeHit) {
//                 this.ballMovements.increaseBallVelocity()
//                 this.paddleMovements.increasePaddleVelocity()
//             }
//             this.ballMovements.reverseY()
//             ballPosition.y += 2.5
//         }
//         for (const row of GameBoard.stage.bricks) {
//             for (let index = 0, length = row.length; index < length; index++) {
//                 const brick = row[index];
//                 if (ballSphere.intersectsBox(brick.box)) {
//                     const edgeHit = brick.boxEdges.find(([start, end]) => {
//                         const edgeDirection = new Vector3().subVectors(end, start).normalize();
//                         const edgeToSphere = new Vector3().subVectors(ballSphere.center, start);
//                         const projection = edgeToSphere.dot(edgeDirection);
//                         const clampedProjection = Math.max(0, Math.min(projection, start.distanceTo(end)));
//                         const closestPoint = new Vector3().copy(edgeDirection).multiplyScalar(clampedProjection).add(start);
//                         return closestPoint.distanceTo(ballSphere.center) < ballSphere.radius
//                     })
//                     if (edgeHit) {
//                         console.log('brick edgeHit')
//                         this.ballMovements.increaseBallVelocity()
//                         this.paddleMovements.increasePaddleVelocity()
//                         this.ballMovements.reverseX()
//                         this.ballMovements.reverseY()
//                     } else {
//                         const { x, y } = brick.position
//                         if (Math.abs(ballPosition.x - x) > Math.abs(ballPosition.y - y)) {
//                             this.ballMovements.reverseX()
//                         } else {
//                             this.ballMovements.reverseY()
//                         }
//                     }

//                     if (brick.onCollision()) {
//                         GameBoard.scene.remove(brick.mesh)
//                         row.splice(index, 1)
//                     }
//                     break
//                 }
//             }
//         }
//         const { left, right, top, limit } = GameBoard.stage.walls
//         if (ballSphere.intersectsBox(limit.box)) {
//             this.paddleMovements.reset()
//             this.ballMovements.reset()
//             GameBoard.resetStage()
//             return true
//         }
//         if (ballSphere.intersectsBox(top.box)) {
//             this.ballMovements.reverseY()
//         }
//         if (ballSphere.intersectsBox(left.box) || ballSphere.intersectsBox(right.box)) {
//             this.ballMovements.reverseX()
//         }
//         ballPosition.add(ballVelocity)
//         return false
//     }
// }
