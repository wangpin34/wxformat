/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('mdast').Strong} Strong
 * @typedef {import('../state.js').State} State
 */
import gatherPosition from './gather-position.js'
/**
 * Turn an mdast `strong` node into hast.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Strong} node
 *   mdast node.
 * @returns {Element}
 *   hast node.
 */
export function strong(state, node) {
  /** @type {Element} */
  const result = {
    type: 'element',
    tagName: 'strong',
    properties: { ...gatherPosition(node) },
    children: state.all(node),
  }
  state.patch(node, result)
  return state.applyData(node, result)
}
