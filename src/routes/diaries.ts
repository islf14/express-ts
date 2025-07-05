import { Router } from 'express'
import * as diaryServices from '../services/diary'
import toNewDiaryEntry from '../utils'

const router = Router()

router.get('/', (_req, res) => {
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
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
})

export default router
