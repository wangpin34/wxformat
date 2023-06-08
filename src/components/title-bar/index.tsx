export default function TitleBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Light</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>关于</a>
          </li>
          <li>
            <details>
              <summary>文件</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>导入 Markdown</a>
                </li>
                <li>
                  <a>导出 Markdown</a>
                </li>
                <li>
                  <a>导出 html </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}
