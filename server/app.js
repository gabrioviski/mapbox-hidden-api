const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors({
    origin: 'https://gabrioviski.github.io',
    optionsSuccessStatus: 200,
}))

app.get('/api/:query', async (req, res) => {
    const accessToken = process.env.MAPBOX_KEY
    const { query } = req.params
    const { reverse } = req.query
    let limit = 3
    const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
    console.log(query, reverse)
    if (reverse) {
        limit = 1
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=${limit}&language=pt&bbox=${bbox}`
    const resObj = await fetch(url)
    const dataRes = await resObj.json()
    res.json(dataRes)
})

app.listen(5501)