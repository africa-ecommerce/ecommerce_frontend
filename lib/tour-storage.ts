import { get, set } from "idb-keyval"

export interface TourData {
  lastTourDate: string | null
  timesSeen: number
}

export interface SharePromptData {
  lastSharePrompt: string | null
}

const TOUR_KEY = "pluggnTour"
const SHARE_KEY = "pluggnSharePrompt"

export async function getTourData(): Promise<TourData> {
  const data = await get<TourData>(TOUR_KEY)
  return data || { lastTourDate: null, timesSeen: 0 }
}

export async function saveTourData(data: TourData): Promise<void> {
  await set(TOUR_KEY, data)
}

export async function shouldShowTour(): Promise<boolean> {
  const data = await getTourData()

  // Never show again after 3 times
  if (data.timesSeen >= 3) {
    return false
  }

  // First time - always show
  if (data.timesSeen === 0) {
    return true
  }

  // Check if enough time has passed
  if (!data.lastTourDate) {
    return true
  }

  const lastDate = new Date(data.lastTourDate)
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

  // Second time - after 5 days
  if (data.timesSeen === 1 && daysSince >= 5) {
    return true
  }

  // Third time - after 14 days
  if (data.timesSeen === 2 && daysSince >= 14) {
    return true
  }

  return false
}

export async function markTourSeen(): Promise<void> {
  const data = await getTourData()
  await saveTourData({
    lastTourDate: new Date().toISOString(),
    timesSeen: data.timesSeen + 1,
  })
}

export async function getSharePromptData(): Promise<SharePromptData> {
  const data = await get<SharePromptData>(SHARE_KEY)
  return data || { lastSharePrompt: null }
}

export async function shouldShowSharePrompt(): Promise<boolean> {
  const data = await getSharePromptData()

  if (!data.lastSharePrompt) {
    return true
  }

  const lastDate = new Date(data.lastSharePrompt)
  const now = new Date()
  const hoursSince = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60)

  // Show again after 24 hours
  return hoursSince >= 24
}

export async function markSharePromptShown(): Promise<void> {
  await set(SHARE_KEY, { lastSharePrompt: new Date().toISOString() })
}
