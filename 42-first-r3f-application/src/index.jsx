import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience.js"
import * as THREE from "three"

const root = ReactDOM.createRoot(document.querySelector("#root"))
const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [5, 2, 5],
}
const glSettings = {
    // antialias: false,
    // toneMapping: THREE.CineonToneMapping,
    // outputColorSpace: THREE.SRGBColorSpace,
}
root.render(
    <Canvas camera={cameraSettings} gl={glSettings}>
        <Experience />
    </Canvas>
)
