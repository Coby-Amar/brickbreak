import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

import { gLTFLoader } from "./utils";

export class Loader {
    _loader = null
    renderer = new WebGLRenderer({ antialias: true })
    scene = new Scene()
    camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000)
    controls = null
    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        document.querySelector('#loading').appendChild(this.renderer.domElement)

        this.scene.add(new AmbientLight(0xFFFFFF))

        this.camera.position.set(0, 0, 10)
        this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
    }

    async start() {
        if (!this._loader) {
            this._loader = (await gLTFLoader.loadAsync('/loading.glb')).scene
        }
        this._loader.position.set(0, 0, 0)
        this._loader.rotateX(1.57079632679)
        this.scene.add(this._loader)

        this.camera.position.set(0, 0, 10)

        this.renderer.setAnimationLoop(() => {
            this._loader.rotateY(-0.05)
            this.renderer.render(this.scene, this.camera)
        })
    }
    stop() {
        this.renderer.domElement.remove()
        this.renderer.dispose()
    }
}
