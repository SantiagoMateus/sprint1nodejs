   
const express = require("express")
const app = express()

app.use(express.static("aplicação"));


const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log("http://localhost:" + PORT)
})