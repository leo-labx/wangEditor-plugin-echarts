/**
 * @description parse elem html test
 * @author Leo
 */

import createEditor from '../utils/create-editor'
import parseHtmlConf from '../../src/module/parse-elem-html'
import { EChartsElement } from '../../src/module/custom-types'

describe('parse elem html', () => {
  const editor = createEditor()

  it('selector', () => {
    expect(parseHtmlConf.selector).toBe('span[data-w-e-type="echarts"]')
  })

  it('parse html', () => {
    const value = `
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
  `
    const height = '300'
    const width = '500'
    // elem-to-html 产出的 html 格式： <span data-w-e-type="echarts" data-w-e-is-void data-w-e-is-inline data-value="${value}" data-height="${height}" data-width="${width}"></span>
    const elem = document.createElement('span')
    elem.setAttribute('data-w-e-type', 'echarts')
    elem.setAttribute('data-value', value)
    elem.setAttribute('data-height', height)
    elem.setAttribute('data-width', width)

    const echarts = parseHtmlConf.parseElemHtml(elem, [], editor) as EChartsElement
    expect(echarts.type).toBe('echarts')
    expect(echarts.value).toBe(value)
    expect(echarts.height).toBe(height)
    expect(echarts.width).toBe(width)
  })
})
