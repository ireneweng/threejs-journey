import { useEffect, useRef, useState } from "react"

export default function Clicker({
    increment,
    keyName,
    textColor = "darkorchid",
}) {
    // const countState = useState(0)
    // const count = countState[0]
    // const setCount = countState[1]
    const [count, setCount] = useState(
        parseInt(localStorage.getItem(keyName) ?? 0)
    )

    const buttonRef = useRef()

    // called after the first render
    useEffect(() => {
        // const savedCount = parseInt(localStorage.getItem("count") ?? 0)
        // setCount(savedCount)
        buttonRef.current.style.backgroundColor = "papayawhip"
        buttonRef.current.style.color = "salmon"

        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])

    const buttonClick = () => {
        // setCount(value + 1)
        setCount((value) => value + 1)
        increment()
    }
    return (
        <div>
            <div style={{ color: textColor }}>Count: {count}</div>
            <button ref={buttonRef} onClick={buttonClick}>
                Click me!
            </button>
        </div>
    )
}
