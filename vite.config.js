// Update for the current lesson
const lessonFolder = '10-debug-ui'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    // Update for the current lesson
    root: `${lessonFolder}/src/`,
    publicDir: `${lessonFolder}/static/`,
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}