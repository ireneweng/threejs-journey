// Update for the current lesson
const lessonFolder = "22-raycaster-and-mouse-events"
const isCodeSandbox =
    "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env

export default {
    root: lessonFolder,
    publicDir: "static",
    base: "./",
    server: {
        host: true,
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
    },
}
