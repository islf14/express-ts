import { DiaryEntry, newDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'

import fs from 'node:fs'
const diaryData = JSON.parse(
  fs.readFileSync('./src/services/diaries.json', 'utf-8')
)

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>

export const getEntries = () => diaries

export const findById = (
  id: number
): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id)
  if (entry !== undefined) {
    const { comment, ...rest } = entry
    return rest as NonSensitiveInfoDiaryEntry
  }
  return undefined
}

export const getEntriesWithoutSensitiveInfo =
  (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
      return {
        id,
        date,
        weather,
        visibility
      } as NonSensitiveInfoDiaryEntry
    })
  }

export const addDiary = (newDiaryEntry: newDiaryEntry): DiaryEntry => {
  const newDiary: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}
