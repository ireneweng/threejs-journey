import * as THREE from "three"
import GUI from "lil-gui"

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: "#62a9f0",
}
gui.addColor(parameters, "materialColor").onChange(() => {
    material.color.set(parameters.materialColor)
    particlesMat.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const gradientTex = textureLoader.load("textures/gradients/3.jpg")
gradientTex.magFilter = THREE.NearestFilter

// Materials
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTex,
})

// Objects
const objDist = 4
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material)
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
const meshes = [mesh1, mesh2, mesh3]
for (let i = 0; i < meshes.length; i++) {
    let mesh = meshes[i]
    mesh.position.y = -objDist * i

    if (i % 2 == 0) {
        mesh.position.x = 1
    } else {
        mesh.position.x = -1
    }
}

scene.add(mesh1, mesh2, mesh3)

// Lights
const directionalLight = new THREE.DirectionalLight("#ffffff", 2)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

// Particles
const particlesCount = 1000
const positions = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 5
    positions[i * 3 + 1] = objDist / 2 - Math.random() * objDist * meshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5
}
const particlesGeo = new THREE.BufferGeometry()
particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

const particlesMat = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
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
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll & Cursor
 */
let scrollY = window.scrollY
window.addEventListener("scroll", () => {
    scrollY = window.scrollY
})

const cursor = {
    x: 0,
    y: 0,
}
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = clock.getElapsedTime()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = (-scrollY / sizes.height) * objDist

    const amplitude = 1.2
    const parallaxX = cursor.x * amplitude
    const parallaxY = -cursor.y * amplitude
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime

    // Animate objects
    for (const mesh of meshes) {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.2
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
