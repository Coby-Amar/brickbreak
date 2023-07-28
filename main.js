import { Brick } from './src/Brick'
import './style.css'

import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, Vector3, } from 'three'
import { GridHelper, } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Ball } from './src/Ball';
import { Wall } from './src/Wall';
import { Paddle } from './src/Paddle';
import { getLeftLimit, getPaddleLeft, getPaddleRight, getRightLimit, getWindowCenterX } from './src/UTILS';
import { movePaddle, onMouseMove } from './src/movment';

const renderer = new WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.querySelector('#app').appendChild(renderer.domElement)

const scene = new Scene()
const gridHelper = new GridHelper(window.innerWidth, 100)
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const ambientLight = new AmbientLight(0xFBFAF5)

const bricks = Array(5).fill(null).map((_, index) =>
  Array(10).fill(null).map((_v, innderIndex) => Brick(-67.5 + (innderIndex * 15), 135 - (index * 10))),
)
const ball = Ball(0, 35)
const paddle = Paddle(0, 30)

const RIGHT_WALL_X = 82.5
const LEFT_WALL_X = -RIGHT_WALL_X
const TOP_WALL_HEIGHT = 10

scene.add(Wall(LEFT_WALL_X, 75))
scene.add(Wall(RIGHT_WALL_X, 75))
scene.add(Wall(0, 145, { width: 165, height: TOP_WALL_HEIGHT }))
scene.add(ball)
scene.add(paddle)
scene.add(gridHelper)
scene.add(ambientLight)

bricks.forEach(line => line.forEach(brick => scene.add(brick)))

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 50, 250)
controls.update();

window.addEventListener('mousemove', (e) => onMouseMove(e, camera, paddle, RIGHT_WALL_X, LEFT_WALL_X))
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  window.removeEventListener('mousemove')
  window.addEventListener('mousemove', (e) => onMouseMove(e, camera, paddle, RIGHT_WALL_X, LEFT_WALL_X))

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}


function animate() {
  requestAnimationFrame(animate);
  movePaddle(paddle, RIGHT_WALL_X, LEFT_WALL_X)
  renderer.render(scene, camera);
}
animate()