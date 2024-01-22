import { useState } from "react"

export default function People() {
    const [people, setPeople] = useState([
        { name: "irene" },
        { name: "tim" },
        { name: "mavis" },
    ])
    return (
        <div>
            <h2>People</h2>
        </div>
    )
}
