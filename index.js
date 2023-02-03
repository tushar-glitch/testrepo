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

app.post('/test_route_2', (req, res)=> {
    const { email, password } = req.body
    if (email && password) {
        res.status(200).json({
            "message":"Authentication successfull!"
        })
    }
    else {
        res.status(404).json({
            "message":"Please enter all the fields"
        })
    }
})

app.listen(3000)