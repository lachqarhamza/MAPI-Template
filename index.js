import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import features from './features'
import middlewares from './middlewares'

dotenv.config()

if (process.env.NODE_ENV !== 'test') {
	mongoose
		.connect(process.env.DB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => console.log('MongoDB connected...'))
		.catch(err => console.log('MongoDb Error: ', err.message))
}

let app = express()
app.disable('etag')
app.enable('trust proxy')
app.use(logger('dev'))
app.use(express.static('public', { etag: false }))
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/exampleRoute', middlewares.isAuth, features.exampleFeature.router)

const PORT = process.env.SERVER_PORT
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
}

export default app
