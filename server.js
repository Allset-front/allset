const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const baseUrl = dev
    ? process.env.NEXT_PUBLIC_URL_DEV || `http://localhost:${port}`
    : process.env.NEXT_PUBLIC_URL_RELEASE;

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    if (dev) {
        console.log(`> Server running at ${baseUrl} (development)`);
    } else {
        console.log(`> Server started (${process.env.NODE_ENV}) at ${baseUrl}`);
    }
})