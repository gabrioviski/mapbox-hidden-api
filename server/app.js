const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200,
}))

app.get('/api/:query', async (req, res) => {
    const accessToken = process.env.MAPBOX_KEY
    const query = req.params.query
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=3&language=pt`
    const resObj = await fetch(url)
    const dataRes = await resObj.json()
    res.json(dataRes)
})

app.listen(5501)