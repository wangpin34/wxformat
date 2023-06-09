import React, { useCallback, useRef } from 'react'
import { markdownState, initialMarkdownState } from 'states/markdown'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useAddNotification } from 'states/notification'
import { downloadText } from 'utils/download'

function DownloadMarkdown() {
  const addNotification = useAddNotification()
  const markdown = useRecoilValue(markdownState)
  const onDownloadMarkdown = useCallback(() => {
    downloadText(markdown, 'markdown.md', 'text/plain')
    addNotification({ type: 'success', text: '下载完成' })
  }, [markdown, addNotification])
  return <a onClick={onDownloadMarkdown}>下载 Markdown</a>
}

export default function TitleBar() {
  const addNotification = useAddNotification()
  const setInitialMarkdown = useSetRecoilState(initialMarkdownState)
  const setMarkdown = useSetRecoilState(markdownState)
  const markdownImportRef = useRef<HTMLInputElement>(null)
  const handleImportMarkdown = useCallback(() => {
    if (markdownImportRef.current) {
      markdownImportRef.current.click()
    }
  }, [])
  const onImportMarkdown = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          addNotification({ type: 'success', text: '导入成功' })
          setInitialMarkdown(reader.result as string)
        },
        false
      )

      if (file) {
        reader.readAsText(file)
      }
    },
    [setMarkdown]
  )

  return (
    <>
      <div className="navbar bg-base-100 fixed top-0">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">WeiXin format</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>文件</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a onClick={handleImportMarkdown}>导入 Markdown</a>
                    <input
                      type="file"
                      accept=".md"
                      name="markdown-file"
                      id="markdown-file"
                      className="hidden"
                      ref={markdownImportRef}
                      onChange={onImportMarkdown}
                    />
                  </li>
                  <li>
                    <DownloadMarkdown />
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a href="https://github.com/wangpin34/wxformat" target="_blank">
                关于
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
