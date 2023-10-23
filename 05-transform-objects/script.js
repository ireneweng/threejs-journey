import * as THREE from "three"

// scene
const scene = new THREE.Scene()

// // cube
// // width, height, depth
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// mesh.position.set(0.7, -0.6, 1)
// mesh.scale.set(2, 0.5, 0.5)

// // cube rotation
// mesh.rotation.reorder("YXZ")
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube2)
cube2.position.x = -1.5

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube3)
cube3.position.x = 1.5

// axes helper
const axes_helper = new THREE.AxesHelper(2)
scene.add(axes_helper)

// // distance between the center of the scene and cube's position
// console.log(mesh.position.length())
// // sets the length to 1
// console.log(mesh.position.normalize())

const sizes = {
    width: 800,
    height: 600,
}

// camera
// field of view, aspect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.set(1, 1, 3)
scene.add(camera)

// // distance between the cube and camera
// console.log(mesh.position.distanceTo(camera.position))
// look at cube
// camera.lookAt(mesh.position)

// renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    // if property is exact same name as var, can remove : canvas
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
