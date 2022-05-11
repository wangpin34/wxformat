import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function randomeStr() {
  return `${Math.random()}`.substr(2)
}

function useContainer() {
  const [container, setContainer] = useState<HTMLDivElement>()

  useEffect(() => {
    if (!container) {
      const dom = document.createElement('div') as HTMLDivElement
      dom.id = randomeStr()
      document.body.appendChild(dom)
      setContainer(dom)
      return () => {
        if (dom && document.getElementById(dom.id)) {
          document.body.removeChild(dom)
        }
      }
    }
  }, [container])

  return container
}

interface Props {
  children: any
  l?: any
}

function Portal({ children }: Props) {
  const container = useContainer()

  if (container) {
    return ReactDOM.createPortal(children, container)
  }
  return null
}

export default Portal
