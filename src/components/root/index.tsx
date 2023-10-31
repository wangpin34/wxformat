import Editor from 'components/editor'
import NotificationMgmt from 'components/notification'
import Renderer from 'components/renderer'
import TitleBar from 'components/title-bar'
import { useEffect } from 'react'
import { useRecoilCallback } from 'recoil'
import { previewerPreferencesState } from 'states/preferences'
import { setPreviewerPreferences } from 'utils/storage'
import { write } from 'utils/markdown-storage'
import { markdownState } from 'states/markdown'

function Root() {
  const persistState = useRecoilCallback(({ snapshot }) => async () => {
    const previewerPreferences = await snapshot.getPromise(previewerPreferencesState)
    const markdown = await snapshot.getPromise(markdownState)
    setPreviewerPreferences(previewerPreferences)
    write(markdown)
  })
  useEffect(() => {
    window.addEventListener('unload', () => {
      persistState()
    })
  })
  return (
    <div className="h-screen max-h-screen">
      <TitleBar />
      <div className="h-screen max-h-screen pt-[68px] xl:container mx-auto  grid grid-cols-2 gap-8">
        <div className="max-h-full overflow-auto" id="editor-container">
          <Editor />
        </div>
        <div className="max-h-full overflow-auto shadow-lg bg-white" id="preview-container">
          <Renderer />
        </div>
      </div>
      <NotificationMgmt />
    </div>
  )
}

export default Root
