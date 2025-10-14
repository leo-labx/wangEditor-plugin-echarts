/**
 * @description ECharts menu entry
 * @author Leo
 */

import InsertEChartsMenu from './InsertECharts'
import EditEChartsMenu from './EditECharts'

export const insertEChartsMenuConf = {
  key: 'insertECharts', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new InsertEChartsMenu()
  },
}

export const editEChartsMenuConf = {
  key: 'editECharts', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new EditEChartsMenu()
  },
}
