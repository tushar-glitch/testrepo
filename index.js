const express = require('express')
const app = express()
const cors = require('cors')
const auth_Model = require('./models/userAuth')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const connection_url = 'mongodb://jumbo:tcxCKjlxOsj1vdNe@ac-vi9pq53-shard-00-00.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-01.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-02.ktnuczj.mongodb.net:27017/?ssl=true&replicaSet=atlas-8zajnt-shard-0&authSource=admin&retryWrites=true&w=majority'
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);
mongoose
.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB connected");
})

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
        const newuser = auth_Model({
            email: email,
            password: password
        })
        const saveuser = newuser.save()
    }
    else {
        res.status(404).json({
            "message":"Please enter all the fields"
        })
    }
})

app.listen(3000)