import { useEffect, useState } from "react"

export default function Clicker({ keyName }) {
    console.log(keyName)

    // const countState = useState(0)
    // const count = countState[0]
    // const setCount = countState[1]
    const [count, setCount] = useState(
        parseInt(localStorage.getItem("count") ?? 0)
    )

    useEffect(() => {
        // const savedCount = parseInt(localStorage.getItem("count") ?? 0)
        // setCount(savedCount)
        return () => {
            localStorage.removeItem("count")
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("count", count)
    }, [count])

    const buttonClick = () => {
        // setCount(value + 1)
        setCount((value) => value + 1)
    }
    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={buttonClick}>Click me!</button>
        </div>
    )
}
