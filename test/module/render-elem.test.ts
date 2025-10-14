/**
 * @description echarts render-elem test
 * @author Leo
 */

import createEditor from '../utils/create-editor'
import renderElemConf from '../../src/module/render-elem'
import { EChartsElement } from '../../src/module/custom-types'

describe('echarts render-elem', () => {
  const editor = createEditor()
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

  it('type', () => {
    expect(renderElemConf.type).toBe('echarts')
  })

  it('render elem', () => {
    const containerVnode = renderElemConf.renderElem(echartsElem, null, editor) as any
    expect(containerVnode.sel).toBe('div')
    expect(containerVnode.data.props.contentEditable).toBe(false)

    const echartsVnode = containerVnode.children[0]
    expect(echartsVnode.sel).toBe('w-e-echarts-card')
    expect(echartsVnode.data.dataset.value).toBe(`
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
    expect(echartsVnode.data.dataset.height).toBe('300')
    expect(echartsVnode.data.dataset.width).toBe('500')
  })
})
