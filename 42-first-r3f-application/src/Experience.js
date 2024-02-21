import { useRef } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObject from "./CustomObject.js"
extend({ OrbitControls })

export default function Experience() {
    // called on each frame before rendering the scene
    const {camera, gl} = useThree()
    const cubeRef = useRef()
    const carouselGroup = useRef()
    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
        carouselGroup.current.rotation.y += delta
    })

    return <>
        <orbitControls args={ [camera, gl.domElement] } />

        <ambientLight intensity={1.5} />
        <directionalLight position={ [1, 2, 3] } intensity={3.5} />

        <group ref={carouselGroup}>
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </group>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <CustomObject />
    </>
}