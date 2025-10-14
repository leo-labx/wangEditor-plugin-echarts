/**
 * @description edit ECharts menu test
 * @author Leo
 */

import { SlateEditor, DomEditor, SlateNode } from '@wangeditor/editor'
import createEditor from '../../utils/create-editor'
import { EChartsElement } from '../../../src/module/custom-types'
import EditorEChartsMenu from '../../../src/module/menu/EditECharts'
import withECharts from '../../../src/module/plugin'

describe('edit echarts menu', () => {
  let editor = withECharts(createEditor())
  const startLocation = SlateEditor.start(editor, [])
  const menu = new EditorEChartsMenu()

  function genEChartsElem() {
    const echartsElem: EChartsElement = {
      type: 'echarts',
      value: `
    {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
  `,
      height: '300',
      width: '500',
      children: [{ text: '' }],
    }
    return echartsElem
  }

  beforeEach(() => {
    editor = withECharts(createEditor())
  })

  it('getValue', () => {
    // 选中空编辑器
    editor.select(startLocation)
    expect(menu.getValue(editor)).toBe('')
    expect(menu.getHeight(editor)).toBe('')
    expect(menu.getWidth(editor)).toBe('')

    // 选中 ECharts 节点
    editor.insertNode(genEChartsElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.getValue(editor)).toBe(`
    {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
  `)
    expect(menu.getHeight(editor)).toBe('300')
    expect(menu.getWidth(editor)).toBe('500')
  })

  it('isActive', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  it('isDisabled', () => {
    // 选中空编辑器
    editor.select(startLocation)
    expect(menu.isDisabled(editor)).toBeTruthy()

    // 选中 ECharts 节点
    editor.insertNode(genEChartsElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.isDisabled(editor)).toBeFalsy()
  })

  it('getModalPositionNode', () => {
    editor.select(startLocation)
    editor.insertNode(genEChartsElem())
    editor.select({ path: [0, 1, 0], offset: 0 })

    const positionNode = menu.getModalPositionNode(editor)
    expect(positionNode).not.toBeNull()
    expect(DomEditor.getNodeType(positionNode as SlateNode)).toBe('echarts')
  })

  it('getModalContentElem', () => {
    editor.select(startLocation)
    editor.insertNode(genEChartsElem())
    editor.select({ path: [0, 1, 0], offset: 0 })

    const modalElem = menu.getModalContentElem(editor)
    expect(modalElem.tagName).toBe('DIV')
  })
})
