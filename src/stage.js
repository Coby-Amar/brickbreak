import { Vector3 } from 'three'
import { Brick } from './components/brick'
import { WallPost } from './components/wallPost'
import { Wall } from './components/wall'
import { Paddle } from './components/paddle'
import { Ball } from './components/ball'
import { GameBoard } from './gameBoard'
import { BallMovements, PaddleMovement } from './movment'

const _ballOriginLocation = { x: 0, y: -115, z: 0 }
const _paddleOriginLocation = { x: 0, y: -150, z: 0 }

export class Stage {
    paddleMovements = new PaddleMovement()
    ballMovements = new BallMovements()

    level = 0
    score = 0
    ball = new Ball(_ballOriginLocation)
    paddle = new Paddle(_paddleOriginLocation)
    walls = {
        left: new WallPost({ x: -400, y: 50, z: 0 }),
        right: new WallPost({ x: 400, y: 50, z: 0 }),
        top: new Wall({ x: 0, y: 300, z: 0 }),
        limit: new Wall({ x: 0, y: -200, z: 0 }),
    }
    bricks = new Array(5).fill(null).map(() => new Array(10).fill(null))
    brokenBricks = []
    constructor(level = 1) {
        if (level < 1) {
            throw Error('Level can\'t be lower then 1')
        }
        this.level = level
        this.bricks = this.bricks.map((brickRow, i) => brickRow.map((_, j) => new Brick({ x: -325 + (j * 73), y: 250 - (i * 50), z: 0 })))
    }
    clearBricks() {
        this.bricks.forEach(row => row.forEach(brick => GameBoard.scene.remove(brick.mesh)))
        this.bricks = new Array(5).fill(null).map(() => new Array(10).fill(null))
    }
    reLoadBricks() {
        this.clearBricks()
        this.bricks = new Array(5).fill(null).map(() => new Array(10).fill(null)).map((brickRow, i) => brickRow.map((_, j) => {
            const brick = new Brick({ x: -325 + (j * 73), y: 250 - (i * 50), z: 0 })
            GameBoard.scene.add(brick.mesh)
            return brick
        }))
    }
    reset() {
        this.ball.position = _ballOriginLocation
        this.paddle.position = _paddleOriginLocation
        this.reLoadBricks()
    }
    render() {
        this.movePaddle()
        if (this.moveBall()) {
            return false
        }
        return true
    }
    movePaddle() {
        const paddlePosition = this.paddle.mesh.position
        const paddleBox = this.paddle.box
        const { left, right } = this.walls
        if (this.paddleMovements._left) {
            if (paddleBox.intersectsBox(left.box)) {
                this.paddleMovements.reset()
                return
            }
            this.paddleMovements.move(paddlePosition)
        }
        if (this.paddleMovements._right) {
            if (paddleBox.intersectsBox(right.box)) {
                this.paddleMovements.reset()
                return
            }
            this.paddleMovements.move(paddlePosition)
        }
    }
    moveBall() {
        const ballPosition = this.ball.mesh.position
        const ballSphere = this.ball.sphere
        const ballVelocity = this.ballMovements.ballVelocity
        if (this.checkBricksCollision()) {
            return false
        }
        const { left, right, top, limit } = this.walls
        if (ballSphere.intersectsBox(limit.box)) {
            this.paddleMovements.reset()
            this.ballMovements.reset()
            this.reset()
            GameBoard.endGame()
            return true
        }
        if (ballSphere.intersectsBox(this.paddle.box)) {
            if (this.paddle.onCollision(ballSphere)) {
                this.ballMovements.increaseBallVelocity()
                this.paddleMovements.increasePaddleVelocity()
            }
            this.ballMovements.reverseY()
            ballPosition.y += 2.5
        }
        if (ballSphere.intersectsBox(top.box)) {
            this.ballMovements.reverseY()
        }
        if (ballSphere.intersectsBox(left.box) || ballSphere.intersectsBox(right.box)) {
            this.ballMovements.reverseX()
        }
        ballPosition.add(ballVelocity)
        return false
    }
    checkBricksCollision() {
        const ballPosition = this.ball.mesh.position
        const ballSphere = this.ball.sphere
        for (const row of this.bricks) {
            for (let index = 0, length = row.length; index < length; index++) {
                const brick = row[index];
                if (ballSphere.intersectsBox(brick.box)) {
                    const edgeHit = brick.boxEdges.find(([start, end]) => {
                        const edgeDirection = new Vector3().subVectors(end, start).normalize();
                        const edgeToSphere = new Vector3().subVectors(ballSphere.center, start);
                        const projection = edgeToSphere.dot(edgeDirection);
                        const clampedProjection = Math.max(0, Math.min(projection, start.distanceTo(end)));
                        const closestPoint = new Vector3().copy(edgeDirection).multiplyScalar(clampedProjection).add(start);
                        return closestPoint.distanceTo(ballSphere.center) < ballSphere.radius
                    })
                    if (edgeHit) {
                        this.ballMovements.increaseBallVelocity()
                        this.paddleMovements.increasePaddleVelocity()
                        this.ballMovements.reverseX()
                        this.ballMovements.reverseY()
                    } else {
                        const { x, y } = brick.position
                        if (Math.abs(ballPosition.x - x) > Math.abs(ballPosition.y - y)) {
                            this.ballMovements.reverseX()
                        } else {
                            this.ballMovements.reverseY()
                        }
                    }

                    if (brick.onCollision()) {
                        GameBoard.scene.remove(brick.mesh)
                        this.score += brick.worth
                        document.querySelector('#score').innerHTML = this.score
                        row.splice(index, 1)
                    }
                    return true
                }
            }
        }
        return false
    }
}