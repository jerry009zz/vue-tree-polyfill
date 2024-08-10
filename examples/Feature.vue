<template>
  <div class="container">
    <!-- 基本用法 -->
    <div class="panel">
      <div class="header">基本用法</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              ref="basicTreeRef"
              :data="basicUsage"
              :nodeClassName="node => `generated-class-${node.id}`"
              animation
              @click="handleClick"
              @node-dblclick="handleDblClick"
              @node-right-click="handleRightClick"
            />
          </div>
        </div>
        <div class="desc">
          <div>纯展示</div>
          <div class="desc-block">
            <button @click="handleExpandAll">展开全部节点</button>
            <button @click="handleCollapseAll">折叠全部节点</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据正确性验证 -->
    <!-- <div class="panel">
      <div class="header">数据正确性验证</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree :data="orderData" default-expand-all></VTree>
          </div>
        </div>
        <div class="desc">数据正确性</div>
      </div>
    </div> -->

    <!-- 单选 -->
    <div class="panel">
      <div class="header">单选</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              v-model="selectableValue"
              :data="selectable"
              @update:modelValue="() => {}"
              selectable
            ></VTree>
          </div>
        </div>
        <div class="desc">
          单选模式。设置 selectable 即可<br />
          v-model: <br />
          {{ selectableValue }}
        </div>
      </div>
    </div>

    <!-- 多选 -->
    <div class="panel">
      <div class="header">多选</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              v-if="showCheckable"
              v-model="checkableValue"
              :data="checkable"
              checkable
              :ignore-mode="checkableIgnoreMode"
              :cascade="checkableCascade"
            ></VTree>
          </div>
        </div>
        <div class="desc">
          <div class="desc-block">
            <p>多选模式。设置 checkable 即可</p>
            v-model: <br />
            {{ checkableValue }}
          </div>
          <div class="desc-block">
            <p>
              设置 ignoreMode 可指定 v-model 与 getCheckedNodes
              方法要忽略父节点或者子节点，该 prop 仅初始设置有效
            </p>
            <button
              v-for="mode in (['none', 'parents', 'children'] as IgnoreType[])"
              :key="mode"
              @click="onIgnoreBtnClick(mode)"
            >
              {{ mode }}
            </button>
            <p>当前 ignoreMode: {{ checkableIgnoreMode }}</p>
          </div>
          <div class="desc-block">
            <p>设置 cascade 可指定父子节点是否级联</p>
            <button
              v-for="(mode, index) in [true, false]"
              :key="index"
              @click="onCascadeBtnClick(mode)"
            >
              {{ mode }}
            </button>
            <p>当前 cascade: {{ checkableCascade }}</p>
          </div>
          <div class="desc-block">
            <p>重置以上选项</p>
            <button @click="onResetBtnClick">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 单选与多选并存 -->
    <div class="panel">
      <div class="header">单选与多选并存</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              v-model="bothValue"
              :data="both"
              checkable
              selectable
            ></VTree>
          </div>
        </div>
        <div class="desc">
          当既可以单选又可以多选时， v-model 绑定的是多选的值<br />
          v-model: <br />
          {{ bothValue }}
        </div>
      </div>
    </div>

    <!-- 连接线 -->
    <div class="panel">
      <div class="header">连接线</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree
              :data="showLineTreeData"
              :showLine="{ type: showLineType, polyline: showLinePolyline, dashDensity }"
              defaultExpandAll
              animation
            />
          </div>
        </div>
        <div class="desc">
          <div class="desc-block">
            传入 showLine 可展示连接线，type 可指定连接线类型
          </div>
          <div class="desc-block">
            showLine 传入对象可设置连接线的宽度，连线类型与颜色等<br/>
            showLine.type:

            <button
              v-for="showLineType in (['solid', 'dashed'] as showLineType[])"
              :key="showLineType"
              @click="onShowLineTypeBtnClick(showLineType)"
            >
              {{ showLineType }}
            </button>
            <p>当前连接线类型：{{showLineType}}</p>
            <p v-if="showLineType === 'dashed'">
              虚线密度：<input type="range" v-model.number="dashDensity" :min="1" :max="10" :step="1" /> {{ dashDensity }}
            </p>
          </div>
          <div class="desc-block">
            showLine.polyline:

            <button
              v-for="polyline in [true, false]"
              :key="polyline"
              @click="onShowLinePolylineBtnClick(polyline)"
            >
              {{ polyline }}
            </button>
            <p>是否启用折线：{{showLinePolyline}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义节点 -->
    <div class="panel">
      <div class="header">自定义节点</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree :data="basicUsage">
              <template #node="{ node }">
                <button>{{ node.title }}</button>
              </template>
            </VTree>
          </div>
        </div>
        <div class="desc">
          <div class="desc-block">
            除了 render，也可以传入 slot 自定义树节点
            <pre>
              {{ nodeSlotDescText }}
            </pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 远程 -->
    <div class="panel">
      <div class="header">远程</div>
      <div class="body">
        <div class="interface">
          <div style="height: 300px">
            <VTree v-if="remoteShow" :load="remoteLoad"></VTree>
          </div>
        </div>
        <div class="desc">
          <div class="desc-block">
            设置 load 方法可以使用远程加载数据，如果有设置 data ，则 data
            数据作为根数据；<br />
            如果没有传 data ，则初始化时调用 load 方法载入根数据，其中节点参数为
            null
          </div>
          <div class="desc-block">
            <button @click="onLoadDataClick">加载树组件</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VTree, { TreeNode } from '../src'
import { showLineType } from '../src/constants'
import { IgnoreType } from '../src/types'
import treeDataGenerator from '../tests/tree-data-generator'
import { defineComponent, ref, nextTick } from 'vue'

const genData = (extra = {}) => {
  return treeDataGenerator(
    Object.assign(
      {
        treeDepth: 3,
        nodesPerLevel: 5,
        sameIdTitle: true
      },
      extra
    )
  )
}

const genChildrenData = (nodeCount = 2) => {
  return treeDataGenerator({
    treeDepth: 1,
    nodesPerLevel: nodeCount,
    inOrder: true,
    useNanoID: true,
  })
}

export default defineComponent({
  name: 'Feature',
  components: {
    VTree
  },
  setup() {
    const selectableData = genData().data
    selectableData[0].selected = true
    const checkableData = genData().data
    checkableData[0].expand = true
    checkableData[1].children![0].disabled = true
    // checkableData[1].children[0].children[0].checked = true
    const selectableValue = ref('')
    const checkableValue = ref<(string | number)[]>([checkableData[0].id!])
    const basicUsage = ref(genData().data)
    const orderData = ref(genData({ inOrder: true }).data)
    const selectable = ref(selectableData)
    const showCheckable = ref(true)
    const checkable = ref(checkableData)
    const checkableIgnoreMode = ref<IgnoreType>('none')
    const checkableCascade = ref(true)
    const both = ref(genData().data)
    const bothValue = ref([])
    const showLineTreeData = ref([
      {
        title: 'node-1',
        id: 'node-1',
        children: [
          {
            title: 'node-1-1',
            id: 'node-1-1',
            children: [
              {
                title: 'node-1-1-1',
                id: 'node-1-1-1',
              },
              {
                title: 'node-1-1-2',
                id: 'node-1-1-2',
              },
              {
                title: 'node-1-1-3',
                id: 'node-1-1-3',
              },
            ],
          },
          {
            title: 'node-1-2',
            id: 'node-1-2',
            children: [
              {
                title: 'node-1-2-1',
                id: 'node-1-2-1',
              },
              {
                title: 'node-1-2-2',
                id: 'node-1-2-2',
              },
            ],
          },
          {
            title: 'node-1-3',
            id: 'node-1-3',
            children: [
              {
                title: 'node-1-3-1',
                id: 'node-1-3-1',
              },
              {
                title: 'node-1-3-2',
                id: 'node-1-3-2',
              },
            ],
          },
        ],
      },
      {
        title: 'node-2',
        id: 'node-2',
        children: [
          {
            title: 'node-2-1',
            id: 'node-2-1',
            children: [
              {
                title: 'node-2-1-1',
                id: 'node-2-1-1',
              },
              {
                title: 'node-2-1-2',
                id: 'node-2-1-2',
              },
            ],
          },
        ],
      },
    ])
    const remoteShow = ref(false)
    const remoteLoad = (
      node: TreeNode | null,
      resolve: Function,
      reject: Function
    ) => {
      setTimeout(() => {
        resolve(genChildrenData(node ? 2 : 5).data)
      }, 1000)
    }

    function onIgnoreBtnClick(mode: IgnoreType) {
      checkableIgnoreMode.value = mode
      showCheckable.value = false
      nextTick(() => {
        checkableValue.value = []
        showCheckable.value = true
      })
    }

    function onCascadeBtnClick(mode: boolean) {
      checkableCascade.value = mode
      showCheckable.value = false
      nextTick(() => {
        checkableValue.value = []
        showCheckable.value = true
      })
    }

    function onResetBtnClick() {
      showCheckable.value = false
      nextTick(() => {
        checkableIgnoreMode.value = 'none'
        checkableCascade.value = true
        checkableValue.value = []
        showCheckable.value = true
      })
    }

    function onLoadDataClick() {
      remoteShow.value = false
      nextTick(() => {
        remoteShow.value = true
      })
    }

    const basicTreeRef = ref()

    const handleExpandAll = () => {
      basicTreeRef.value.setExpandAll(true)
    }

    const handleCollapseAll = () => {
      basicTreeRef.value.setExpandAll(false)
      basicTreeRef.value.scrollTo(basicUsage.value[0].id, 0)
    }

    const handleClick = (node: TreeNode, e: MouseEvent) => {
      console.log('click', node, e)
      console.log('click mouse position', e.x, e.y)
    }
    const handleDblClick = (node: TreeNode, e: MouseEvent) => {
      console.log('node-dblclick', node, e)
      console.log('node-dblclick mouse position', e.x, e.y)
    }
    const handleRightClick = (node: TreeNode, e: MouseEvent) => {
      e.preventDefault()
      console.log('node-right-click', node, e)
      console.log('node-right-click mouse position', e.x, e.y)
    }

    const showLineType = ref()
    const onShowLineTypeBtnClick = (type: showLineType) => {
      showLineType.value = type
    }

    const dashDensity = ref(3)

    const showLinePolyline = ref(false)
    const onShowLinePolylineBtnClick = (polyline: boolean) => {
      showLinePolyline.value = polyline
    }

    const nodeSlotDescText = `
<VTree :data="basicUsage">
  <template #node="{ node }">
    <button>{{ node.title }}</button>
  </template>
</VTree>
    `

    return {
      // 基本用法
      basicUsage,
      basicTreeRef,
      handleClick,
      handleDblClick,
      handleRightClick,
      handleExpandAll,
      handleCollapseAll,

      // 数据正确性
      orderData,

      // 单选
      selectable,
      // selectableValue: selectableData[0].id,
      selectableValue,

      // 多选
      showCheckable,
      checkable,
      checkableValue,
      checkableIgnoreMode,
      checkableCascade,

      // 单选与多选并存
      both,
      bothValue,

      // 连接线
      showLineTreeData,
      showLineType,
      onShowLineTypeBtnClick,
      showLinePolyline,
      onShowLinePolylineBtnClick,
      dashDensity,

      // 自定义节点
      nodeSlotDescText,

      // 远程
      remoteShow,
      remoteLoad,
      onIgnoreBtnClick,
      onCascadeBtnClick,
      onResetBtnClick,
      onLoadDataClick
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  .panel {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;

    .header {
      height: 30px;
      border-bottom: 1px solid lightgray;
      padding: 10px 30px;
    }

    .body {
      display: flex;

      .interface {
        flex: 1;
        padding: 10px 30px;
        border-right: 1px solid lightgray;
      }

      .desc {
        flex: 1;
        padding: 10px 30px;

        .desc-block {
          padding: 5px 0;
          margin-bottom: 10px;
          border-bottom: 1px solid lightgray;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
