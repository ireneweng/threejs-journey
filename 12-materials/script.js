import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import GUI from "lil-gui"

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const color = textureLoader.load("textures/door/color.jpg")
const alpha = textureLoader.load("textures/door/alpha.jpg")
const ambOccl = textureLoader.load("textures/door/ambientOcclusion.jpg")
const height = textureLoader.load("textures/door/height.jpg")
const normal = textureLoader.load("textures/door/normal.jpg")
const metallic = textureLoader.load("textures/door/metalness.jpg")
const roughness = textureLoader.load("textures/door/roughness.jpg")
const gradient = textureLoader.load("textures/gradients/3.jpg")
const matcap = textureLoader.load("textures/matcaps/2.png")

gradient.minFilter = THREE.NearestFilter
gradient.magFilter = THREE.NearestFilter

const cubeTexLoader = new THREE.CubeTextureLoader()

const envTextures = ["px", "nx", "py", "ny", "pz", "nz"]
const envTexturePaths = []
for (let i = 0; i < 6; i++) {
    envTexturePaths[i] = `textures/environmentMaps/1/${envTextures[i]}.jpg`
}
const envMap = cubeTexLoader.load(envTexturePaths)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = color
// material.color.set("yellow")
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = alpha

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcap

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x131442)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradient

// const material = new THREE.MeshStandardMaterial()
// material.map = color
// material.aoMap = ambOccl
// material.aoMapIntensity = 1
// material.displacementMap = height
// material.displacementScale = 0.05
// material.metalnessMap = metallic
// material.roughnessMap = roughness
// material.normalMap = normal
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alpha

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0
material.envMap = envMap

gui.add(material, "metalness").min(0).max(1)
gui.add(material, "roughness").min(0).max(1)
gui.add(material, "aoMapIntensity").min(0).max(5)
gui.add(material, "displacementScale").min(0).max(1)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

sphere.position.x = -1.25
torus.position.x = 1.25

scene.add(sphere, plane, torus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
