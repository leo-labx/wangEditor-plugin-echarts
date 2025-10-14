/**
 * @description parse elem html
 * @author Leo
 */

import { DOMElement } from '../utils/dom'
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { EChartsElement } from './custom-types'

function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  const value = elem.getAttribute('data-value') || ''
  const height = elem.getAttribute('data-height') || '300'
  const width = elem.getAttribute('data-width') || '500'
  return {
    type: 'echarts',
    value,
    height,
    width,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as EChartsElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="echarts"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
