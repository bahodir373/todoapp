const express = require("express")
const cors = require("cors")
const dataRouter = require("./router/data_router")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000

app.use(dataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})