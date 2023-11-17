import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import GUI from "lil-gui"

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
 * Galaxy
 */
const parameters = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 5,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
}

const createGalaxyGeo = () => {
    // create custom geometry
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)

    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        const idx = i * 3

        // position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle =
            ((i % parameters.branches) / parameters.branches) * Math.PI * 2

        const randX =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)
        const randY =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)
        const randZ =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)

        positions[idx + 0] = Math.cos(branchAngle + spinAngle) * radius + randX
        positions[idx + 1] = randY
        positions[idx + 2] = Math.sin(branchAngle + spinAngle) * radius + randZ

        // colors
        const colorMix = colorInside.clone()
        colorMix.lerp(colorOutside, radius / parameters.radius)
        colors[idx + 0] = colorMix.r
        colors[idx + 1] = colorMix.g
        colors[idx + 2] = colorMix.b
    }

    // set attribute on the geometry
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geometry
}

const createGalaxyMat = () => {
    // create points material
    const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })
    return material
}

let galaxyGeo = null
let galaxyMat = null
let galaxy = null

const generateGalaxy = () => {
    // destroy the old galaxy
    if (galaxy != null) {
        galaxyGeo.dispose()
        galaxyGeo.dispose()
        scene.remove(galaxy)
    }

    galaxyGeo = createGalaxyGeo()
    galaxyMat = createGalaxyMat()
    galaxy = new THREE.Points(galaxyGeo, galaxyMat)
    scene.add(galaxy)
}

gui.add(parameters, "count")
    .min(100)
    .max(100000)
    .step(100)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "size")
    .min(0.01)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "radius")
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "branches")
    .min(3)
    .max(20)
    .step(1)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "spin")
    .min(-5)
    .max(5)
    .step(1)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "randomness")
    .min(-2)
    .max(2)
    .step(0.001)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "randomnessPower")
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(generateGalaxy)
gui.add(parameters, "insideColor").onFinishChange(generateGalaxy)
gui.add(parameters, "outsideColor").onFinishChange(generateGalaxy)

generateGalaxy()

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
camera.position.x = 3
camera.position.y = 3
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
