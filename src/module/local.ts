/**
 * @description 多语言
 * @author Leo
 */

import { i18nAddResources } from '@wangeditor/editor'

i18nAddResources('en', {
  echarts: {
    echarts: 'ECharts',
    placeholder: 'Use Apache ECharts',
    insert: 'Insert ECharts',
    edit: 'Edit ECharts',
    height: 'Height',
    width: 'Width',
    ok: 'OK',
  },
})

i18nAddResources('zh-CN', {
  echarts: {
    echarts: 'ECharts',
    placeholder: '使用 Apache ECharts',
    insert: '插入ECharts',
    edit: '编辑ECharts',
    height: '高度',
    width: '宽度',
    ok: '确定',
  },
})
