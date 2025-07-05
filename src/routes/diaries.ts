import { Router } from 'express'
import * as diaryServices from '../services/diary'

const router = Router()

router.get('/', (_req, res) => {
  console.log('GET /diaries')
  res.status(200).send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(parseInt(req.params.id))
  if (diary !== undefined) {
    res.send(diary)
    return
  } else {
    res.sendStatus(404)
    return
  }
})

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body
  const newDiaryEntry = diaryServices.addDiary({
    date,
    weather,
    visibility,
    comment
  })
  res.json(newDiaryEntry)
})

export default router
