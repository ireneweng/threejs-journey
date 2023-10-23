import * as THREE from "three"
import gsap from "gsap"

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Time
let time = Date.now()

// Clock
const clock = new THREE.Clock()

// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})

// Animations
const tick = () => {
    // // Time
    // const current_time = Date.now()
    // const delta_time = current_time - time
    // time = current_time

    // Clock
    const elapsed_time = clock.getElapsedTime()

    // // update objects
    // mesh.position.x += 0.01
    // mesh.position.y += 0.01

    // // using delta
    // mesh.rotation.y += 0.001 * delta_time

    // // using clock
    // mesh.rotation.y = elapsed_time * Math.PI * 2

    // fun with math functions
    camera.position.x = Math.cos(elapsed_time)
    camera.position.y = Math.sin(elapsed_time)
    camera.lookAt(mesh.position)

    // render on each frame
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
