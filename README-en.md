# wangEditor ECharts

./README-en.md

## Introduction

<https://www.wangeditor.com/> ECharts plugin, using <https://echarts.apache.org/>.

!./_img/demo.png

## Installation

```shell
yarn add echarts
yarn add wangeditor-plugin-echarts
```

## Usage

### Register to the Editor

```js
import { Boot, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import echartsModule from 'wangeditor-plugin-echarts'

// Register. Must be done before creating the editor and can only be registered once.
Boot.registerModule(echartsModule)
```

### Configuration

```js
// Editor configuration
const editorConfig: Partial<IEditorConfig> = {
  // Hover menu when ECharts is selected
  hoverbarKeys: {
    echarts: {
      menuKeys: ['editEcharts'], // "Edit ECharts" menu
    },
  },

  // Other configurations...
}

// Toolbar configuration
const toolbarConfig: Partial<IToolbarConfig> = {
  insertKeys: {
    index: 0,
    keys: [
      'insertECharts', // "Insert ECharts" menu
      // 'editECharts' // "Edit ECharts" menu
    ],
  },

  // Other configurations...
}
```

Then create the editor and toolbar using `editorConfig` and `toolbarConfig`. Refer to the wangEditor documentation for details.

### HTML Output

The ECharts element outputs HTML in the following format:

```html
<span data-w-e-type="echarts" data-w-e-is-void data-w-e-is-inline data-value="
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
  " data-height="300" data-width="500"></span>
```

Here, `data-value` contains the ECharts configuration options, which can be used with <https://echarts.apache.org/> to render the `<span>` as an ECharts card. `data-height` specifies the chart's height, and `data-width` specifies the chart's width.

## Other

Supports i18n (internationalization).

## Acknowledgments

We thank the following organizations or individuals for their support:

- [wangEditor Team](https://github.com/wangeditor-team)
- [Apache ECharts](https://github.com/apache/echarts)
