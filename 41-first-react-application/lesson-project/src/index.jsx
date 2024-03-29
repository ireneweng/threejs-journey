import { createRoot } from "react-dom/client"
import App from "./App.js"
import "./style.css"

const root = createRoot(document.querySelector("#root"))

const name = "React"

root.render(
    // <>
    //     {/* Comment! */}
    //     <h1 className = "main-title"
    //         style = {{
    //                 color: "seagreen",
    //                 backgroundColor: "floralwhite"
    //             }}
    //     >
    //         Hello {name}
    //     </h1>
    //     <p className="cute-paragraph">Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.
    //     </p>
    //     <input type="checkbox" id="my-checkbox" />
    //     <label htmlFor="my-checkbox">My Checkbox</label>
    // </>
    <>
    <App numClickers = {3}>
        <h1>My First React App</h1>
        <h2>My little subtitle</h2>
    </App>
    {/* <App numClickers = {3} children={
        <>
            <h1>My First React App</h1>
            <h2>My little subtitle</h2>
        </>
        }
    /> */}
    </>
)
