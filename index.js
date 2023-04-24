const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const MainRoute = require('./src/Router/mainRouter')
require('./src/db/conn')
app.use(express.json())
app.use('/api/user',MainRoute)
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})