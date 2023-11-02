import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "lil-gui"

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog("#373157", 2, 20)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

function tileTextures(texture, num) {
    texture.repeat.set(num, num)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return
}

// Door Textures
const doorColorTex = textureLoader.load("textures/door/color.jpg")
const doorAlphaTex = textureLoader.load("textures/door/alpha.jpg")
const doorAOTex = textureLoader.load("textures/door/ambientOcclusion.jpg")
const doorHeightTex = textureLoader.load("textures/door/height.jpg")
const doorNormalTex = textureLoader.load("textures/door/normal.jpg")
const doorMetalnessTex = textureLoader.load("textures/door/metalness.jpg")
const doorRoughnessTex = textureLoader.load("textures/door/roughness.jpg")

// Wall Textures
const brickColorTex = textureLoader.load("textures/bricks/color.jpg")
const brickAOTex = textureLoader.load("textures/bricks/ambientOcclusion.jpg")
const brickNormalTex = textureLoader.load("textures/bricks/normal.jpg")
const brickRoughnessTex = textureLoader.load("textures/bricks/roughness.jpg")

// Ground Textures
const grassColorTex = textureLoader.load("textures/grass/color.jpg")
const grassAOTex = textureLoader.load("textures/grass/ambientOcclusion.jpg")
const grassNormalTex = textureLoader.load("textures/grass/normal.jpg")
const grassRoughnessTex = textureLoader.load("textures/grass/roughness.jpg")
const grassTextures = [
    grassColorTex,
    grassAOTex,
    grassNormalTex,
    grassRoughnessTex,
]

for (let i = 0; i < grassTextures.length; i++) {
    tileTextures(grassTextures[i], 8)
}

/**
 * Environment
 */

// Ground
const groundSize = 20
const groundMat = new THREE.MeshStandardMaterial({
    map: grassColorTex,
    aoMap: grassAOTex,
    normalMap: grassNormalTex,
    roughnessMap: grassRoughnessTex,
})
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(groundSize, groundSize),
    groundMat
)
ground.rotation.x = -Math.PI * 0.5
ground.position.y = 0
scene.add(ground)

// House Group
const house = new THREE.Group()
scene.add(house)

// Walls
const wallSize = 5
const wallHeight = 2.5
const wallMat = new THREE.MeshStandardMaterial({
    map: brickColorTex,
    aoMap: brickAOTex,
    normalMap: brickNormalTex,
    roughnessMap: brickRoughnessTex,
})
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallSize, wallHeight, wallSize),
    wallMat
)
walls.position.y = wallHeight / 2
house.add(walls)

// Roof
const roofSize = 4
const roofHeight = 2
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(roofSize, roofHeight, roofSize),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
)
roof.position.y = roofHeight / 2 + wallHeight
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const doorSize = 2
const doorMat = new THREE.MeshStandardMaterial({
    map: doorColorTex,
    transparent: true,
    alphaMap: doorAlphaTex,
    aoMap: doorAOTex,
    displacementMap: doorHeightTex,
    displacementScale: 0.1,
    normalMap: doorNormalTex,
    metalnessMap: doorMetalnessTex,
    roughnessMap: doorRoughnessTex,
})
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorSize, doorSize),
    doorMat
)
door.position.y = doorSize / 2 - 0.1
door.position.z = wallSize / 2 + 0.01
house.add(door)

// Bushes
const bushGeo = new THREE.SphereGeometry(1, 16, 16)
const bushMat = new THREE.MeshStandardMaterial({ color: "#89c854" })

// Right Bushes
const bush1 = new THREE.Mesh(bushGeo, bushMat)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1, 0.2, 2.8)
const bush2 = new THREE.Mesh(bushGeo, bushMat)
bush2.scale.set(0.2, 0.3, 0.2)
bush2.position.set(1.6, 0.1, 3)

// Left Bushes
const bush3 = new THREE.Mesh(bushGeo, bushMat)
bush3.scale.set(0.5, 0.8, 0.5)
bush3.position.set(-1, 0.5, 2.8)
const bush4 = new THREE.Mesh(bushGeo, bushMat)
bush4.scale.set(0.3, 0.3, 0.3)
bush4.position.set(-1.6, 0.1, 2.8)

house.add(bush1, bush2, bush3, bush4)

house.traverse(function (obj) {
    obj.castShadow = true
})

// Graveyard Group
const graveyard = new THREE.Group()
scene.add(graveyard)

// Graves
const graveHeight = 0.8
const graveGeo = new THREE.BoxGeometry(0.6, graveHeight, 0.2)
const graveMat = new THREE.MeshStandardMaterial({ color: "#b2b6b1" })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = groundSize / 5
    const scatter = Math.random() * 5
    const displacement = radius + scatter
    const x = Math.sin(angle) * displacement
    const z = Math.cos(angle) * displacement

    const grave = new THREE.Mesh(graveGeo, graveMat)
    grave.position.set(x, graveHeight / 2 - Math.random() * 0.25, z)
    grave.rotation.y = Math.sin(Math.abs(grave.position.x) * Math.PI) / 3
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true

    graveyard.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.25)
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001).name("ambient")
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.5)
moonLight.position.set(4, 5, -2)
moonLight.castShadow = true
scene.add(moonLight)

gui.add(moonLight, "intensity").min(0).max(1).step(0.001).name("moonlight")
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001).name("moon x")
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001).name("moon y")
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001).name("moon z")

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 1.5, 7)
doorLight.position.set(0, 2.5, 2.8)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3)
scene.add(ghost1)
const ghost2 = new THREE.PointLight("#00ffff", 2, 3)
scene.add(ghost2)
const ghost3 = new THREE.PointLight("#ffff00", 2, 3)
scene.add(ghost3)

const pointLights = [doorLight, ghost1, ghost2, ghost3]

function adjustPointLightShadow(light, size, far) {
    light.castShadow = true
    light.shadow.mapSize.set(size, size)
    light.shadow.camera.far = far
    return
}

for (let i = 0; i < pointLights.length; i++) {
    adjustPointLightShadow(pointLights[i], 256, 5)
}

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor("#373157")
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

ground.receiveShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 5
    ghost1.position.z = Math.sin(ghost1Angle) * 5
    ghost1.position.y = Math.sin(ghost1Angle * 3)

    const ghost2Angle = -elapsedTime * 0.25
    ghost2.position.x = Math.cos(ghost2Angle) * 4.5
    ghost2.position.z = Math.sin(ghost2Angle) * (4.5 * Math.sin(elapsedTime))
    ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(elapsedTime * 2)

    const ghost3Angle = -elapsedTime * 0.125
    ghost3.position.x = Math.cos(ghost3Angle) * 6.3
    ghost3.position.z = Math.sin(ghost3Angle) * 6.3 * Math.cos(elapsedTime + 3)
    ghost3.position.y = Math.sin(ghost3Angle * 6.3) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
