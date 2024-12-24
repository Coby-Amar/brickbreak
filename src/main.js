import './style.css'

import { AmbientLight, Box3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { GAME_BOARD } from './state';
import { addEventListeners } from './events';
import { moveBall, movePaddle } from './movment'


function animate() {
  const {
    startGame,
    renderer,
    scene,
    camera,
    terrain_map,
  } = GAME_BOARD
  if (startGame) {
    movePaddle()
    if (moveBall()) {
      GAME_BOARD.startGame = false
    }
  }
  // Rotates the Map
  // terrain_map.rotateY(0.001);
  renderer.render(scene, camera)
}

async function start() {
  GAME_BOARD.renderer.setSize(window.innerWidth, window.innerHeight)

  document.querySelector('#app').appendChild(GAME_BOARD.renderer.domElement)

  // const gridHelper = new GridHelper(window.innerWidth, 100)
  // GAME_BOARD.scene.add(gridHelper)
  const ambientLight = new AmbientLight(0xFFFFFF)
  GAME_BOARD.scene.add(ambientLight)

  // const brick = (await GAME_BOARD.loader.loadAsync('red_brick.glb')).scene
  // brick.scale.set(30, 40, 50);
  // Array(5).fill(null).forEach((_, index) =>
  //   Array(10).fill(null).forEach((_v, innderIndex) => {
  //     const clonedBrick = brick.clone()
  //     clonedBrick.position.x = -40 + (innderIndex * 9)
  //     clonedBrick.position.y = 95 - (index * 10)
  //     GAME_BOARD.scene.add(clonedBrick)
  //   }))

  const terrain_map = (await GAME_BOARD.loader.loadAsync('/jungle_terrain_map.glb')).scene
  terrain_map.scale.set(6000, 6000, 6000);
  GAME_BOARD.terrain_map = terrain_map
  GAME_BOARD.scene.add(terrain_map)


  const paddle = (await GAME_BOARD.loader.loadAsync('/paddle.glb')).scene
  paddle.position.set(0, 20, 0)
  GAME_BOARD.paddle = paddle
  GAME_BOARD.scene.add(paddle)

  const ball = (await GAME_BOARD.loader.loadAsync('/ball.glb')).scene
  ball.position.set(0, 24, 0)
  GAME_BOARD.ball = ball
  GAME_BOARD.ballResetPosition = ball.position.clone()
  GAME_BOARD.scene.add(ball)

  const topWall = (await GAME_BOARD.loader.loadAsync('/top_wall.glb')).scene
  const rightWall = (await GAME_BOARD.loader.loadAsync('/right_wall.glb')).scene
  const leftWall = (await GAME_BOARD.loader.loadAsync('/left_wall.glb')).scene
  const limit = (await GAME_BOARD.loader.loadAsync('/limit.glb')).scene
  topWall.position.set(0, 100, 0)
  rightWall.position.set(50, 50, 0)
  leftWall.position.set(-50, 50, 0)
  limit.position.set(0, 19, 0)
  GAME_BOARD.scene.add(topWall)
  GAME_BOARD.scene.add(rightWall)
  GAME_BOARD.scene.add(leftWall)
  GAME_BOARD.scene.add(limit)
  const walls = {
    top: new Box3().setFromObject(topWall),
    right: new Box3().setFromObject(rightWall),
    left: new Box3().setFromObject(leftWall),
    limit: new Box3().setFromObject(limit),
  }
  GAME_BOARD.walls = walls

  GAME_BOARD.camera.position.set(0, 34, 204)
  GAME_BOARD.scene.position.set(0, -50, 0)
  GAME_BOARD.camera.lookAt(GAME_BOARD.scene.position)

  GAME_BOARD.controls = new OrbitControls(GAME_BOARD.camera, GAME_BOARD.renderer.domElement)
  GAME_BOARD.controls.update()


  addEventListeners()
  GAME_BOARD.renderer.setAnimationLoop(animate)
}

start()
