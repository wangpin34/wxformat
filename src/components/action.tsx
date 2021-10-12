/** @jsxImportSource theme-ui */
import React, { Component } from 'react'

interface Props {
  current: any
  onClick(next: any): void
  Component: typeof Component
}

function Action({ current, onClick, Component }: Props) {
  return <Component data-value={current} onClick={onClick} />
}

function ActionBar({ children }: { children: any }) {
  return <div>{children}</div>
}

export { Action, ActionBar }
export default ActionBar
