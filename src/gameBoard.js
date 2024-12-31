import { AmbientLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import { Stage } from "./stage";
import { gLTFLoader } from "./utils";

export class GameBoard {
    static running = false
    static scene = new Scene()
    static renderer = new WebGLRenderer({ antialias: true })
    static camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000)
    static stage = new Stage()
    static controls = null
    static async render() {
        const renderer = this.renderer
        const scene = this.scene
        const stage = this.stage

        renderer.setSize(window.innerWidth, window.innerHeight)
        document.querySelector('#app').appendChild(renderer.domElement)
        scene.add(new AmbientLight(0xFFFFFF))

        const terrainMap = (await gLTFLoader.loadAsync('/jungle_terrain_map.glb')).scene
        terrainMap.scale.set(10000, 10000, 10000);
        scene.add(terrainMap)

        scene.add(stage.paddle.mesh)
        scene.add(stage.ball.mesh)
        const { left, right, top, limit } = stage.walls
        scene.add(left.mesh)
        scene.add(right.mesh)
        scene.add(top.mesh)
        scene.add(limit.mesh)

        stage.bricks.forEach(row => row.forEach(brick => scene.add(brick.mesh)))

        const controls = new OrbitControls(this.camera, renderer.domElement)
        controls.autoRotate = true
        // scene.add(new GridHelper(innerWidth))
        this.camera.position.set(0, 0, 700)
        scene.position.set(0, -50, 0)
        controls.update()
        this.controls = controls

        renderer.setAnimationLoop(() => {
            if (this.running) {
                this.running = stage.render()
            }
            // this.terrainMap.rotateY(0.001);
            // controls.update()
            renderer.render(scene, this.camera)
        })
    }

    static startStage() {
        this.running = true
    }
    static endGame() {
        this.running = false
    }
    static resetStage() {
        this.running = false
        this.stage.reset()
        this.stage.bricks.forEach(row => row.forEach(brick => this.scene.add(brick.mesh)))
    }
    static resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
