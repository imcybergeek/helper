const express = require('express')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('I am helper')
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))