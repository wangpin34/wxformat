import Editor from 'components/editor'
import Renderer from 'components/renderer'
import TitleBar from 'components/title-bar'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    //@ts-ignore
    <RecoilRoot>
      <div className="h-screen max-h-screen">
        <TitleBar />
        {/* <div id="preferences" className="fixed top-0 left-0 h-10 bg-slate-500">
          <Preperences />
        </div> */}

        <div className="h-screen max-h-screen pt-10 xl:container mx-auto p-2 grid grid-cols-2 gap-8">
          <Editor />
          <Renderer />
        </div>
      </div>
    </RecoilRoot>
  )
}

export default App
