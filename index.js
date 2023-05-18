import express, { json }    from 'express'
import cors                 from 'cors'
import router               from './src/routes/index.js'

const app = express()

app.use(cors())
app.use(json())
app.use('/api', router)

const PORT = process.env.APP_PORT || 5000

const start = async () => {
    app.listen(PORT, () => console.log(`App started on PORT ${PORT}`))
}

start()