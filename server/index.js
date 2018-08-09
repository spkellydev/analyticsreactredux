const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static(path.join(__dirname, "../build"))); //serves the index.html

app.get('/ga', (req, res) => {
    const getData = require('./lib/analytics')

    getData().then((ga) => {
        res.json(ga.data)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})


app.listen(PORT, () => console.log(`server started on port ${PORT}`))

module.exports = app