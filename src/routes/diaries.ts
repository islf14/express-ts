import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  console.log('GET /diaries')
  res.status(200).send('List of diaries')
})

router.post('/', (_req, res) => {
  console.log('POST /diaries')
  res.status(201).send('Diary created')
})

export default router
