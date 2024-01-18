import { useState } from "react"
import Clicker from "./Clicker.js"

export default function App() {
    // return <h1>My Application</h1>

    const [hasClicker, setHasClicker] = useState(true)
    const toggleText = hasClicker ? "Hide" : "Show"

    const toggleClicker = () => {
        setHasClicker((value) => !value)
    }

    return (
        <>
            <button onClick={toggleClicker}>{toggleText} Clicker</button>
            {/* {hasClicker ? <Clicker></Clicker> : null} */}
            {hasClicker && (
                <>
                    <Clicker keyName="countA" />
                    <Clicker keyName="countB" />
                    <Clicker keyName="countC" />
                </>
            )}
        </>
    )
}
