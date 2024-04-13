import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import colors from 'colors'

import diseaseDecision from './patientDiseaseDecison.js'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/disease_decision', diseaseDecision)

app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)