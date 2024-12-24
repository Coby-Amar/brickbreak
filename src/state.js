import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const GAME_BOARD = {
    renderer: new WebGLRenderer({ alpha: true }),
    loader: new GLTFLoader(),
    scene: new Scene(),
    camera: new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000),
    constrols: null,
    terrain_map: null,
    startGame: false,
    ball: null,
    ballResetPosition: null,
    paddle: null,
    paddleBox: null,
    paddleDirection: {
        y: 0,
        x: 0,
    },
    walls: {
        top: null,
        right: null,
        left: null,
        limit: null,
    },
    wallsBody: {
        top: null,
        right: null,
        left: null,
        limit: null,
    },
    ballState: {
        x: 1,
        y: .5,
        reverseX() {
            this.x *= -1
        },
        reverseY() {
            this.y *= -1
        },
        reset() {
            this.x = 1
            this.y = .5
        }
    }
}