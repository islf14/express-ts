import express, { json } from 'express'
import diaryRouter from './routes/diaries'

const app = express()
const port = 3000
app.use(json())

app.get('/', (_req, res) => {
  res.send('Welcome to the Diary API!')
})

app.use('/api/diaries', diaryRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
