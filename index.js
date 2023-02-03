const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/test_route', function (req, res) {
    res.json({
        "name": "Demo",
        "age": "20",
        "email":"demo@gmail.com"
    })
})

app.listen(3000)