import { WALL_HEIGHT, WALL_WIDTH } from "./Wall"

export const getWindowCenterX = () => window.innerWidth / 2

export const getTopLimit = (topWallHeight = 1) => WALL_HEIGHT - topWallHeight
export const getLeftLimit = (wallPoistionX = 1) => wallPoistionX + WALL_WIDTH / 2
export const getRightLimit = (wallPoistionX = 1) => wallPoistionX - WALL_WIDTH / 2

export const getPaddleLeft = (paddlePositionX = 1) => paddlePositionX - 10 / 2
export const getPaddleRight = (paddlePositionX = 1) => paddlePositionX + 10 / 2