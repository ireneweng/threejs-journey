import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import GUI from "lil-gui"

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTex = textureLoader.load("textures/particles/2.png")

/**
 * Particles
 */
const count = 10000

// create custom geometry
const particlesGeo = new THREE.BufferGeometry()

// create new positions array
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}
// set attribute on the geometry
particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

// create points material
const particlesMat = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: new THREE.Color("#ff88cc"),
    transparent: true,
    alphaMap: particleTex,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
})
const particles = new THREE.Points(particlesGeo, particlesMat)
scene.add(particles)

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
camera.position.z = 3
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

    // Update particles
    // particles.rotation.y = elapsedTime * 0.2
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const y_idx = i3 + 1
        const x = particlesGeo.attributes.position.array[i3]
        particlesGeo.attributes.position.array[y_idx] = Math.sin(
            elapsedTime + x
        )
    }
    particlesGeo.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
