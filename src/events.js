import { LEFT_ARROW_CODE, RIGHT_ARROW_CODE, SPACE_CODE } from './consts'
import { GameBoard } from './gameBoard'

export class EventListeners {
    static addEvents() {
        window.addEventListener('keydown', ({ code }) => {
            const paddleMovements = GameBoard.stage.paddleMovements
            switch (code) {
                case LEFT_ARROW_CODE:
                    paddleMovements.setLeft()
                    break
                case RIGHT_ARROW_CODE:
                    paddleMovements.setRight()
                    break
                case SPACE_CODE:
                    GameBoard.startStage()
                    break
                case 'KeyR':
                    GameBoard.resetStage()
                    GameBoard.stage.ballMovements.reset()
                    break
                default:
                    break
            }
        })

        window.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case LEFT_ARROW_CODE:
                case RIGHT_ARROW_CODE:
                    GameBoard.stage.paddleMovements.reset()
                    break
                default:
                    break
            }
        })

        window.addEventListener('resize', () => GameBoard.resize())

    }
}
