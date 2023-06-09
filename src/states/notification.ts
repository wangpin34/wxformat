import { atom, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import { nanoid } from 'nanoid'

const DEFAULT_TIME_TO_DISS = 2000

export interface Notification {
  id: string
  type: 'info' | 'success'
  text: string
  archived?: boolean
  timeToDisappear: number
}

export const notificationState = atom<Notification | null>({
  key: 'notificationState',
  default: null,
})

export function useAddNotification() {
  const setNotification = useSetRecoilState(notificationState)
  return useCallback((n: Omit<Notification, 'id' | 'timeToDisappear'> & { id?: string; timeToDisappear?: number }) => {
    //@ts-ignore
    const next = { id: nanoid(), timeToDisappear: DEFAULT_TIME_TO_DISS, ...n }
    setNotification(next)
  }, [])
}
