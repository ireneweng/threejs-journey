import { useEffect, useState } from "react"

export default function People() {
    const [people, setPeople] = useState([
        { id: 1, name: "irene" },
        { id: 2, name: "tim" },
        { id: 3, name: "mavis" },
    ])

    const getPeople = async () => {
        // const request = fetch("https://jsonplaceholder.typicode.com/users")
        // request.then((response) => {
        //     const parse = response.json()
        //     parse.then((result) => setPeople(result)
        // })

        // simplification with chaining
        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .then((result) => {
        //         setPeople(result)
        //     })

        // cleaner syntax
        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then((response) => response.json())
        //     .then((result) => setPeople(result)

        // asynchronous solution
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        )
        const result = await response.json()
        setPeople(result)
    }

    useEffect(() => {
        getPeople()
    }, [])

    return (
        <div>
            <h2>People</h2>
            <ul>
                {people.map((person) => {
                    return <li key={person.id}>{person.name}</li>
                })}
            </ul>
        </div>
    )
}
