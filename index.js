const express = require('express')
const app = express()

app.post('/test_route', function (req, res) {
    res.json({
        "name": "Demo",
        "age": "20",
        "email":"demo@gmail.com"
    })
})

app.listen(3000)