const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static(path.join(__dirname, "../public"))); //serves the index.html

/**
 * Named routes for Express must be declared before the React application
 */

app.get('/ga', (req, res) => {
    const getData = require('./lib/analytics')

    // if (gaData) {
    //     let response = gaData
    //     console.log('cached response')
    //     res.json(response.data)
    // } else {
        console.log('request')
        getData().then((ga) => {
            gaData = ga
            res.json(ga.data)
        })
    // }
})

/**
 * Serve the React application
 * Use the wildcard so that routes defer to the React application
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

/**
 * Serve the application
 */
app.listen(PORT, () => console.log(`server started on port ${PORT}`))

module.exports = app