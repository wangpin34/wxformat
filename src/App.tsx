/** @jsxImportSource theme-ui */
import React from 'react'
//@ts-ignore
import Renderer from 'components/renderer'
import Preperences from 'components/preferences'
import Editor from 'components/editor'

function App() {
  return (
    <div className="h-screen max-h-screen">
      <div id="preferences" className="fixed top-0 left-0 h-10 bg-slate-500">
        <Preperences />
      </div>

      <div className="h-screen max-h-screen pt-10 xl:container mx-auto p-2 grid grid-cols-2 gap-8">
        <Editor />
        <Renderer />
      </div>
    </div>
  )
}

export default App
