/**
 * @description edit ECharts menu
 * @author Leo
 */

import { IModalMenu } from '@wangeditor/editor'
import {
  DomEditor,
  IDomEditor,
  SlateNode,
  SlateTransforms,
  SlateRange,
  t,
  genModalTextareaElems,
  genModalInputElems,
  genModalButtonElems,
} from '@wangeditor/editor'
import { PENCIL_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { EChartsElement } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-echarts')
}

class EditEChartsMenu implements IModalMenu {
  readonly title = t('echarts.edit')
  readonly iconSvg = PENCIL_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 300
  private $content: Dom7Array | null = null
  private readonly textareaId = genDomID()
  private readonly heightInputId = genDomID()
  private readonly widthInputId = genDomID()
  private readonly buttonId = genDomID()

  private getSelectedElem(editor: IDomEditor): EChartsElement | null {
    const node = DomEditor.getSelectedNodeByType(editor, 'echarts')
    if (node == null) return null
    return node as EChartsElement
  }

  /**
   * 获取ECharts value
   * @param editor editor
   */
  getValue(editor: IDomEditor): string | boolean {
    const echartsElem = this.getSelectedElem(editor)
    if (echartsElem) {
      return echartsElem.value || ''
    }
    return ''
  }

  /**
   * 获取ECharts height
   * @param editor editor
   */
  getHeight(editor: IDomEditor): string | boolean {
    const echartsElem = this.getSelectedElem(editor)
    if (echartsElem) {
      return echartsElem.height || ''
    }
    return ''
  }

  /**
   * 获取ECharts width
   * @param editor editor
   */
  getWidth(editor: IDomEditor): string | boolean {
    const echartsElem = this.getSelectedElem(editor)
    if (echartsElem) {
      return echartsElem.width || ''
    }
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true // 选区非折叠，禁用

    // 未匹配到 echarts node 则禁用
    const echartsElem = this.getSelectedElem(editor)
    if (echartsElem == null) return true

    return false
  }

  // modal 定位
  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return this.getSelectedElem(editor)
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { textareaId, heightInputId, widthInputId, buttonId } = this

    const [textareaContainerElem, textareaElem] = genModalTextareaElems(
      t('echarts.echarts'),
      textareaId,
      t('echarts.placeholder')
    )
    const $textarea = $(textareaElem)
    const [heightInputContainerElem, heightInputElem] = genModalInputElems(
      '高度',
      heightInputId,
      t('echarts.height')
    )
    const $heightInput = $(heightInputElem)
    const [widthInputContainerElem, widthInputElem] = genModalInputElems(
      '宽度',
      widthInputId,
      t('echarts.width')
    )
    const $widthInput = $(widthInputElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('echarts.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const value = $content.find(`#${textareaId}`).val().trim()
        const height = $content.find(`#${heightInputId}`).val().trim()
        const width = $content.find(`#${widthInputId}`).val().trim()
        this.updateECharts(editor, value, height, width)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.html('') // 先清空内容

    // append textarea、input and button
    $content.append(textareaContainerElem)
    $content.append(heightInputContainerElem)
    $content.append(widthInputContainerElem)
    $content.append(buttonContainerElem)

    // 设置 input val
    const value = this.getValue(editor)
    $textarea.val(value)

    const heightValue = this.getHeight(editor)
    $heightInput.val(heightValue)

    const widthValue = this.getWidth(editor)
    $widthInput.val(widthValue)

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $textarea.focus()
    })

    return $content[0]
  }

  private updateECharts(editor: IDomEditor, value: string, height: string, width: string) {
    if (!value) return

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) return

    const selectedElem = this.getSelectedElem(editor)
    if (selectedElem == null) return

    const path = DomEditor.findPath(editor, selectedElem)

    SlateTransforms.removeNodes(editor, { at: path })
    // SlateTransforms.splitNodes(editor, { always: true })
    const props: EChartsElement = {
      type: 'echarts',
      value,
      height: height ? height : '300',
      width: width ? width : '500',
      children: [{ text: '' }], // void node 需要有一个空 text
    }
    SlateTransforms.insertNodes(editor, props)
  }
}

export default EditEChartsMenu
