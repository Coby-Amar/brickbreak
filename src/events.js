import { GAME_BOARD } from './state'
import { LEFT_ARROW_CODE, RIGHT_ARROW_CODE, SPACE_CODE, TOP_WALL_HEIGHT } from './consts'

export function addEventListeners() {
    window.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case LEFT_ARROW_CODE:
                GAME_BOARD.paddleDirection.x = -1
                break
            case RIGHT_ARROW_CODE:
                GAME_BOARD.paddleDirection.x = 1
                break
            case SPACE_CODE:
                GAME_BOARD.startGame = true
                break
            case 'KeyR':
                GAME_BOARD.startGame = false
                GAME_BOARD.ballState.reset()
                const { x, y, z } = GAME_BOARD.ballResetPosition
                GAME_BOARD.ball.position.set(x, y, z)
                GAME_BOARD.paddle.position.x = 0
                break
            default:
                break
        }
    })

    window.addEventListener('keyup', ({ code }) => {
        switch (code) {
            case LEFT_ARROW_CODE:
            case RIGHT_ARROW_CODE:
                GAME_BOARD.paddleDirection.x = 0
                break
            default:
                break
        }
    })

    window.addEventListener('resize', () => {
        GAME_BOARD.camera.aspect = window.innerWidth / (window.innerHeight - TOP_WALL_HEIGHT)
        GAME_BOARD.camera.updateProjectionMatrix()
        GAME_BOARD.renderer.setSize(window.innerWidth, window.innerHeight)
    }, true)
}