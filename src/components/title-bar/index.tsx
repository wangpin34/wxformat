import React, { useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import type { PreviewerPreferences } from 'types/preferences'
import { useRecoilCallback, useSetRecoilState, useRecoilState } from 'recoil'
import { initialMarkdownState, markdownState } from 'states/markdown'
import classnames from 'classnames'
import { useAddNotification } from 'states/notification'
import { previewerPreferencesState } from 'states/preferences'
import { downloadText } from 'utils/download'
import { useForm, Controller } from 'react-hook-form'

function DownloadMarkdown() {
  const addNotification = useAddNotification()
  const onDownloadMarkdown = useRecoilCallback(
    ({ snapshot }) => async () => {
      const markdown = snapshot.getLoadable(markdownState).getValue()
      downloadText(markdown, 'markdown.md', 'text/plain')
      addNotification({ type: 'success', text: '下载完成' })
    },
    [addNotification]
  )
  return <a onClick={onDownloadMarkdown}>下载 Markdown</a>
}

const colors: Array<{ color: string; name: string }> = [
  {
    color: '#ff7500',
    name: '橘红',
  },
  {
    color: '#8F77B5',
    name: '紫苑',
  },

  {
    color: '#4b5cc4',
    name: '宝蓝',
  },
  {
    color: '#00bc12',
    name: '油绿',
  },
]

function CustomPreviewer() {
  const [preferences, setPreferences] = useRecoilState(previewerPreferencesState)
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: preferences,
  })
  const currentColor = watch('color')
  const [open, setOpen] = useState<boolean>(false)
  const handleApply = useCallback((p: PreviewerPreferences) => {
    setPreferences(p)
    setOpen(false)
  }, [])
  return (
    <>
      <a onClick={() => setOpen(true)}>预览界面主题</a>
      {ReactDOM.createPortal(
        <dialog id="my_modal_1" className={classnames('modal modal-middle', { 'modal-open': open })}>
          <div className="modal-box">
            <form onSubmit={handleSubmit(handleApply)}>
              <h3 className="font-bold text-lg text-center">预览界面主题</h3>
              <div className="py-4">
                <div className="form-control w-full max-w-full">
                  <label className="label">
                    <span className="label-text">字号（{watch('fontSize')}）</span>
                  </label>
                  <input type="range" min={14} max={22} className="range" step="2" {...register('fontSize')} />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                  </div>
                </div>
                <div className="form-control w-full max-w-full">
                  <label className="label">
                    <span className="label-text">颜色</span>
                  </label>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <div className="flex justify-between text-slate-50">
                        {colors.map(color => (
                          <div
                            key={color.color}
                            onClick={() => field.onChange(color.color)}
                            style={{ backgroundColor: color.color }}
                            className={classnames(
                              'w-16 h-16 text-center flex justify-center items-center rounded-md outline-slate-600 outline outline-offset-0',
                              {
                                'outline-4': currentColor === color.color,
                              }
                            )}
                          >
                            <span>{color.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  应用
                </button>
                <button className="btn" onClick={() => setOpen(false)} type="reset">
                  取消
                </button>
              </div>
            </form>
          </div>
        </dialog>,
        document.getElementById('popover-root') as HTMLDivElement
      )}
    </>
  )
}

export default function TitleBar() {
  const addNotification = useAddNotification()
  const setMarkdown = useSetRecoilState(initialMarkdownState)
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
          setMarkdown(reader.result as string)
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
          <a className="btn btn-ghost normal-case text-xl">微信公众号编辑器</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>个性化</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <CustomPreviewer />
                  </li>
                </ul>
              </details>
            </li>

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
