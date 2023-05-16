import express, { json }    from 'express'
import cors                 from 'cors'
import router               from './src/routes/index.js'

import dotenv from 'dotenv';

const {
    DATABASE_URL
} = process.env;

console.log(DATABASE_URL)

const app = express()

app.use(cors())
app.use(json())
app.use('/api', router)

const PORT = process.env.PORT || 5000

const start = async () => {
    app.listen(PORT, () => console.log(`App started on PORT ${PORT}`))
}

start()