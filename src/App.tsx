import Editor from 'components/editor'
import Renderer from 'components/renderer'
import TitleBar from 'components/title-bar'
import { RecoilRoot } from 'recoil'
import NotificationMgmt from 'components/notification'

function App() {
  return (
    //@ts-ignore
    <RecoilRoot>
      <div className="h-screen max-h-screen">
        <TitleBar />
        <div className="h-screen max-h-screen pt-[68px] xl:container mx-auto  grid grid-cols-2 gap-8">
          <Editor />
          <Renderer />
        </div>
        <NotificationMgmt />
      </div>
    </RecoilRoot>
  )
}

export default App
