<template>
  <el-table
    ref="msTable"
    :key="tableKey"
    :border="isAllowSaveView"
    class="c--ms-ui-table"
    :data="data"
    :size="size"
    :height="height"
    :row-key="rowKey"
    :header-cell-class-name="e => isAllowSaveView ? 'ms-show-table-dragable-border' : ''"
    :row-class-name="rowClass"
    :span-method="spanMethod"
    @selection-change="onSelectionChange"
    @row-click="onRowClick"
  >
    <template v-slot:empty>
      <slot name="_empty" />
    </template>

    <!--编号-->
    <el-table-column
      v-if="needIndex"
      type="index"
      width="30"
      fixed
    />
    <!--复选-->
    <el-table-column
      v-if="needSelect"
      type="selection"
      align="center"
      :reserve-selection="reserveSelection"
      fixed
    />

    <el-table-column
      v-for="(row, index) in columns"
      :key="index"
      :label="row.label"
      :fixed="row.fixed && (row.fixedPos || 'left')"
      :min-width="row.minWidth"
      :width="row.width"
      :prop="row.field"
      show-overflow-tooltip
    >
      <template slot="header">
        <div
          class="cell-th-nowrap"
          @mouseover="headerMouseover"
          @mouseout="headerMouseout"
        >
          {{ row.label }}
        </div>
      </template>
      <template slot-scope="scope">
        <template v-if="row.needSlot">
          <!-- {{ row.field }} -->
          <slot
            :name="row.field"
            :row="scope.row"
            :$index="scope.$index"
          />
        </template>
        <template v-else>
          {{ scope.row[row.field] }}
        </template>
      </template>
    </el-table-column>
    <el-tooltip
      ref="tooltip"
      placement="top"
      :content="tooltipContent"
    />
  </el-table>
</template>

<script>
import { getStyle } from 'element-ui/src/utils/dom'
export default {
  name: 'MsUiTable',
  mixins: [],
  props: {
    height: {
      type: String,
      default: '100%'
    },
    viewId: {
      type: String,
      default: ''
    },
    viewCode: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      required: true,
      default () {
        return [
          // 初始开发为孙鼎文
          // * 表示必须有的字段
          // # 表示实际会存到后端 viewList 中的字段
          // {
          //   label: '', // String* 表头的名字，需要在语言包里映射
          //   field: '', // String*# 显示的后端接口的 field 属性名称
          //   fixed: '', // Boolean# 是否固定的位置
          //   fixedPos: '', // String 固定的位置：left,right 空则表示不固定
          //   minWidth: '', // Number 最小宽度
          //   width: '', // Number# 宽度
          //   needSlot: '', // Boolean 是否是插槽，如果需要用插槽，那列表获取数据时就不一定是从 field 字段获取了
          //   fixedShow: '', // Boolean 如果是 true 则表示允许拖拽顺序、固定等，但是不能隐藏 - 熊亚辉
          //   disableConfig: '' // Boolean 是否禁止本项进行配置 - 如果为 true 那么在 MsTableColumnConfig 中不显示该字段
          // }
        ]
      }
    },
    needIndex: {
      type: Boolean,
      default: false
    },
    needSelect: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: ''
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 是否允许拖拽保存视图
    isAllowSaveView: {
      type: Boolean,
      default: false
    },
    // 行的className的回调方法
    rowClass: {
      type: Function,
      default: () => {
        return ''
      }
    },
    // 合并行或列的计算方法
    spanMethod: {
      type: Function,
      default: () => {
        return ''
      }
    },
    size: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tableKey: 1,
      tooltipContent: ''
    }
  },
  watch: {
    columns () {
      this.tableKey++
    }
  },
  mounted () {
  },
  methods: {
    renderHeader (h, { column }) {
      return h('div', {
        attrs: {
          class: 'cell-th-nowrap'
        },
        on: {
          mouseover: this.headerMouseover,
          mouseout: this.headerMouseout
        }
      }, column.label)
    },
    // 表格表头移进方法
    headerMouseover (e) {
      const cellChild = e.target.parentNode
      const range = document.createRange()
      range.setStart(cellChild, 0)
      range.setEnd(cellChild, cellChild.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
      if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
        const tooltip = this.$refs.tooltip
        this.tooltipContent = cellChild.innerText || cellChild.textContent
        tooltip.referenceElm = cellChild.parentNode
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
        tooltip.doDestroy()
        tooltip.setExpectedState(true)
        tooltip.handleShowPopper()
      }
    },
    // 表格表头移出方法
    headerMouseout () {
      const tooltip = this.$refs.tooltip
      if (tooltip) {
        tooltip.setExpectedState(false)
        tooltip.handleClosePopper()
      }
    },
    onRowClick (row, column, event) {
      this.$emit('onRowClick', row, column, event)
    },
    onSelectionChange (val) {
      this.$emit('onSelectionChange', val)
    }
  }
}
</script>

<style lang="less">
.c--ms-ui-table {
  &.el-table--border {
    border: none;

    &::after {
      background-color: transparent;
    }

    td,
    th {
      border-right: none;
    }
  }

  .el-table__header-wrapper {
    th {
      border-bottom: none;
      &.ms-show-table-dragable-border {
        .cell {
          border-right: 1px solid rgba(56, 75, 92, 0.4);
        }
      }
    }
  }
}
</style>
