import express from 'express';

const app = express()
const port = 22222

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`The webserver is running on http://localhost:${port}`)
})