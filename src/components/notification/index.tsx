import { notificationState, Notification } from 'states/notification'
import { useRecoilValue } from 'recoil'
import { useState, useEffect } from 'react'
import classnames from 'classnames'

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className={classnames('alert', [`alert-${notification.type}`])}>
      <span>{notification.text}</span>
    </div>
  )
}

export default function NotificationMgmt() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notification = useRecoilValue(notificationState)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotifications(pre => {
          const index = pre?.findIndex(n => n.id === notification.id)
          if (index > -1) {
            pre.splice(index, 1)
          }
          return [...pre]
        })
      }, notification.timeToDisappear)
      setNotifications(pre => [notification, ...(pre ?? [])])
    }
  }, [notification])

  return (
    <div>
      <div className="toast toast-center">
        {notifications?.map(n => (
          <NotificationItem notification={n} key={n.id} />
        ))}
      </div>
    </div>
  )
}
