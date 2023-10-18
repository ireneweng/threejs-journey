// scene
const scene = new THREE.Scene()

// cube
// width, height, depth
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

// camera
// field of view, aspect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width, sizes.height)
camera.position.z = 3
scene.add(camera)

// renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    // if property is exact same name as var, can remove : canvas
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)