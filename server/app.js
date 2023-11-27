const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const app = express()
require('dotenv').config()
const accessToken = process.env.MAPBOX_KEY

app.use(cors({
    origin: 'https://gabrioviski.github.io',
    optionsSuccessStatus: 200,
}))

app.get('/geocoding/:query', async (req, res) => {
    const { query } = req.params
    const { reverse } = req.query
    let limit = 3
    const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
    // console.log(query, reverse)
    if (reverse) {
        limit = 1
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=${limit}&language=pt&bbox=${bbox}`
    const resObj = await fetch(url)
    const dataRes = await resObj.json()
    res.json(dataRes)
})

app.get('/routes', async (req, res) => {
    const { startLng, startLat, endLng, endLat } = req.query
    /* const pos = [-46.666042,-23.562117,-46.76131253732086,-23.486774419521012]
    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${pos[0]},${pos[1]};${pos[2]},${pos[3]}?steps=false&overview=full&geometries=geojson&access_token=${accessToken}` */
    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${startLng},${startLat};${endLng},${endLat}?steps=false&overview=full&geometries=geojson&access_token=${accessToken}`
    const resObj = await fetch(url)
    const data = await resObj.json()
    res.json(data)
})

app.listen(5501, () => {
    console.log('Servidor escutando em: https://localhost:5501')
})