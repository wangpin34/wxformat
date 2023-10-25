export default function Toolbar() {
  return (
    <div className="sticky top-0 right-0 flex justify-end">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          主题
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
