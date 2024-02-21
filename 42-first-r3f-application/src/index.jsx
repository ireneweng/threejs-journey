import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience.js"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
    <Canvas
        orthographic
        camera={{
            fov: 45,
            near: 0.1,
            far: 50,
            position: [3, 2, 3],
            zoom: 100,
        }}
    >
        <Experience />
    </Canvas>
)
