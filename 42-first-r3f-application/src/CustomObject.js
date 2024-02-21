import * as THREE from "three"
import { useEffect, useMemo, useRef } from "react"

export default function CustomObject() {
    // 3 vertices per triangle
    const verticesCount = 10 * 3

    const positions = useMemo(() => {
        // 3 values per vertex of each triangle: x, y, z
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }
        
        return positions
    }, [])

    const geometryRef = useRef()
    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, [])

    return <mesh>
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
}