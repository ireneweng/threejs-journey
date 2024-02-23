import { useRef } from "react"
import {
    Float,
    Html,
    MeshReflectorMaterial,
    OrbitControls,
    PivotControls,
    Text,
    TransformControls,
} from "@react-three/drei"

export default function Experience() {
    const cubeRef = useRef()
    const sphereRef = useRef()

    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <PivotControls
                anchor={[0, 0, 0]}
                axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
                depthTest={false}
                // fixed={true}
                lineWidth={4}
                // scale={100}
            >
                <mesh ref={sphereRef} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        center
                        distanceFactor={10}
                        occlude={[cubeRef, sphereRef]}
                        position={[1, 1, 0]}
                        wrapperClass="label"
                    >
                        this is a sphere!
                    </Html>
                </mesh>
            </PivotControls>

            <mesh ref={cubeRef} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={cubeRef} mode="translate" />

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial
                    color="lightblue"
                    blur={[1000, 1000]}
                    mixBlur={0.7}
                    mirror={0.6}
                    resolution={512}
                />
            </mesh>

            <Float floatIntensity={10} rotationIntensity={5} speed={5}>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    maxWidth={2}
                    position-y={2}
                    textAlign="center"
                >
                    I LOVE R3F
                    <meshNormalMaterial />
                </Text>
            </Float>
        </>
    )
}
