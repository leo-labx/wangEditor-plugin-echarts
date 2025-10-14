/**
 * @description render elem
 * @author Leo
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { EChartsElement } from './custom-types'

function renderECharts(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 当前节点是否选中
  const selected = DomEditor.isNodeSelected(editor, elem)

  // 构建 ECharts vnode
  const { value = '', height = '300', width = '500' } = elem as EChartsElement
  const echartsVnode = h(
    'w-e-echarts-card',
    {
      dataset: { value, height, width },
    },
    null
  )

  // 构建容器 vnode
  const containerVnode = h(
    'div',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        display: 'inline-block', // inline
        marginLeft: '3px',
        marginRight: '3px',
        border: selected // 选中/不选中，样式不一样
          ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
          : '2px solid transparent',
        borderRadius: '3px',
        height: `${height}px`,
        width: `${width}px`,
      },
    },
    [echartsVnode]
  )

  return containerVnode
}

const conf = {
  type: 'echarts', // 节点 type ，重要！！！
  renderElem: renderECharts,
}

export default conf
