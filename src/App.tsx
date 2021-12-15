/** @jsxImportSource theme-ui */
import React from 'react'
//@ts-ignore
import Renderer from 'components/renderer'
import Preperences from 'components/preferences'
import Editor from 'components/editor'

function App() {
  return (
    <div>
      <div id="preferences">
        <Preperences />
      </div>

      <div className="xl:container mx-auto p-2 grid grid-cols-2 gap-8">
        <Editor />
        <Renderer />
      </div>
    </div>
  )
}

export default App
