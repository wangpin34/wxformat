/**
 * @typedef {import('hast').Element} HElement
 * @typedef {import('mdast').Element} MElement

 */

/**
 * gather position from mdast
 *
 * @param {MElement} node
 *   mdast node.
 * @returns {HElement}
 *   hast node.
 */

export default function gatherPosition(node) {
  return {
    [`data-startline`]: node.position.start.line,
    [`data-startcolumn`]: node.position.start.column,
    [`data-startoffset`]: node.position.start.offset,
    [`data-endline`]: node.position.end.line,
    [`data-endcolumn`]: node.position.end.column,
    [`data-endoffset`]: node.position.end.offset,
  }
}
