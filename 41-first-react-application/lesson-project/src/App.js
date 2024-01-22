import { useMemo, useState } from "react"
import Clicker from "./Clicker.js"
import People from "./People.js"

export default function App({ numClickers, children }) {
    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)
    const incrementCount = () => {
        setCount((value) => value + 1)
    }

    const toggleText = hasClicker ? "Hide" : "Show"
    const toggleClicker = () => {
        setHasClicker((value) => !value)
    }

    // const tempArray = [...Array(numClickers)]
    // tempArray.map((value, index) => {
    //     console.log(value, index)
    // })

    const colors = useMemo(() => {
        const colors = []
        for (let i = 0; i < numClickers; i++) {
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)
        }
        return colors
    }, [numClickers])

    return (
        <>
            {children}

            <div>Total count: {count}</div>
            <p></p>

            <button onClick={toggleClicker}>{toggleText} Clicker</button>
            {/* {hasClicker ? <Clicker></Clicker> : null} */}
            {hasClicker && (
                <>
                    {[...Array(numClickers)].map((_, index) => (
                        <Clicker
                            key={index} // avoid doing if possible
                            increment={incrementCount}
                            keyName={`count${index}`}
                            textColor={colors[index]}
                        />
                    ))}
                    {/* <Clicker
                        increment={incrementCount}
                        keyName="countA"
                        textColor={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
                    />
                    <Clicker
                        increment={incrementCount}
                        keyName="countB"
                        textColor={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
                    />
                    <Clicker
                        increment={incrementCount}
                        keyName="countC"
                        textColor={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
                    /> */}
                </>
            )}
            <People></People>
        </>
    )
}
