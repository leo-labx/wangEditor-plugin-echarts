/**
 * @description elem to html
 * @author Leo
 */

import { SlateElement } from '@wangeditor/editor'
import { EChartsElement } from './custom-types'

// 生成 html 的函数
function echartsToHtml(elem: SlateElement, childrenHtml: string): string {
  const { value = '', height = '300', width = '500' } = elem as EChartsElement
  const rpValue = value.replace(/"/g, '&quot;')
  return `<span data-w-e-type="echarts" data-w-e-is-void data-w-e-is-inline data-value="${rpValue}" data-height="${height}" data-width="${width}"></span>`
}

// 配置
const conf = {
  type: 'echarts', // 节点 type ，重要！！！
  elemToHtml: echartsToHtml,
}

export default conf
