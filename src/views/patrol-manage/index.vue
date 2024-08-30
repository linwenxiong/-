<template>
  <div class="shelf-analysis-wrappy">
    <h2 class="titles">巡店数据查询</h2>
    <self-query :column="queryColumn" v-model:value="seekGroup" @seekClick="seekStart">
    </self-query>

    <div class="shelf-analysis-table">
      <a-table :row-selection="rowSelection" :dataSource="tableDataSource" :columns="tableColumns" :loading="loading"
        :scroll="{ y: publicStore.getLayoutHeight - 82 }" bordered @change="tableChange"
        :pagination="{ hideOnSinglePage: false, current: tableCurrent }">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'orgName'">
            {{ record.orgName }} ({{ record.organ }})
          </template>
          <template v-if="column.dataIndex === 'control'">
            <div>
              <span class="shelf-analysis-see-btn" @click="showModal(record)">查看评估明细</span>
              <span class="shelf-analysis-see-btn" @click="loadingExportFile(record)" style="color: chocolate;">导 出</span>
            </div>
          </template>
        </template>
      </a-table>
      <div class="patrol-footer-btn" v-if="selectRowTaskId.length">
        <a-button type="primary" @click="selectRowExportFile">
          <template #icon>
            <DownloadOutlined />
          </template>导 出
        </a-button>
      </div>
    </div>

    <a-modal class="modal-wrappy" v-model:visible="visible" width="1400px" :title="modalTitle"
      :bodyStyle="{ 'padding-bottom': '0' }">
      <a-table class="modalBox" :dataSource="modalDataSource" :columns="modalTableColumns" bordered
        :pagination="{ hideOnSinglePage: true, current: tableCurrentModal }" @change="tableChange_modal">
        <template v-slot:bodyCell="{ column, record }">

          <template v-if="column.dataIndex === 'imgs'">
            <a-image :width="30" :height="30" v-for="(img, imgk) in record.imgs" :key="imgk" :src="img" />
          </template>

          <template v-if="column.dataIndex === 'type'">
            <span :style="record.type === 4 ? 'color: darkgreen;' : 'color:red'">{{ record.score === 0 ?
              PINGFENSTATUS[record.type] : '' }}</span>

          </template>

          <template v-if="column.dataIndex === 'imgs2'">
            <a-image :width="30" :height="30" v-for="(img, imgk) in record.imgs2" :key="imgk" :src="IMGHOST + img" />
          </template>

          <template v-if="column.dataIndex === 'qualified'">
            <b style="color: darkgreen;font-family: cursive;" v-if="record.qualified === '合格'">√</b>
            <b style="color: red;font-family: cursive;" v-else-if="record.qualified === '不合格'">×</b>
          </template>

          <template v-if="column.dataIndex === 'describe'">
            <span style="color:red;">{{ record.describe }}</span>
          </template>

        </template>
      </a-table>
      <div class="button-box">
        <a-button type="primary" @click="exportFile">导 出</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue';
import { getDate } from '../../common/utils'
import { queryColumn, tableColumns, modalTableColumns, PINGFENSTATUS, EXPORTCOULMN } from '../../constants/patrol-constants'
import { IMGHOST } from '../../constants/common.js'
import selfQuery from '../../components/self-query.vue'
import { apiGetInspectInfo, apiGetInspectRecordByTaskID } from '../../api/modules/operate'
import { PatrolSeekGroup } from '../../interface'
import { downloadExcel } from '../../plugins/export-excel'
import { usePublicStore } from '../../stores'

let selectRowTaskId = ref<(string | number)[]>([])
let exportFileName = ''
const tableDataSource = ref([])
const modalDataSource = ref(<any>[])
const seekGroup = ref(<PatrolSeekGroup>{
  dateTime: [getDate(), getDate()]
})
const loading = ref(false)
const visible = ref(false)
const modalTitle = ref('')
const tableCurrent = ref(1)
const tableCurrentModal = ref(1)
interface DataItem {
  key: number
  orgName: string
  organ: string
  organNum: number
  recNum: number
  score: number
  taskArea: string
  taskAreaName: string
  taskDate: string
  taskID: number
  taskMan: string
  taskManName: string
}
const publicStore = usePublicStore()

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    selectRowTaskId.value = selectedRowKeys
  },
  onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
    // console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    // console.log(selected, selectedRows, changeRows);
  },
})


const tableChange = (e) => {
  tableCurrent.value = e.current
}

const tableChange_modal = (e) => {
  tableCurrentModal.value = e.current
}

const showModal = async (item) => {
  tableCurrentModal.value = 1
  modalDataSource.value = []
  loading.value = true
  modalTitle.value = `ID:${item.taskID} ${item.orgName}(${item.organ})  ${item.taskAreaName}区域 ${item.taskDate}的评估明细`

  await getModalData(item) // 获取评分详情数据
  visible.value = true
  loading.value = false
}

/**
 * 获取评分详情数据
 */
const getModalData = async (item) => {
  exportFileName = `ID${item.taskID}(${item.organ}店)  ${item.taskAreaName}区域评估明细`
  const { data } = await apiGetInspectRecordByTaskID({
    "taskID": item.taskID
  })
  data.forEach((item) => {
    item.key = item.id
    item.children = item.child
    item.score = 0
    item.child.forEach((item01) => {
      item01.score = 0
      item01.key = item01.id
      item01.children = item01.child
      item01.child.forEach((item02) => {
        item02.ex_type = item02.score === 0 ? PINGFENSTATUS[item02.type] : '' // 状态
        item02.qualified = item02.score > 0 ? '合格' : '不合格'
        item01.score = (item01.score * 10 + item02.score * 10) / 10
        item.score = (item.score * 10 + item02.score * 10) / 10
      })
    })
  })
  modalDataSource.value = data
}
// 处理数据
function processingData(data) {
  data.forEach((item) => {
    item.key = item.id
    item.children = item.child
    item.score = 0
    item.child.forEach((item01) => {
      item01.score = 0
      item01.key = item01.id
      item01.children = item01.child
      item01.child.forEach((item02) => {
        item02.ex_type = item02.score === 0 ? PINGFENSTATUS[item02.type] : '' // 状态
        item02.qualified = item02.score > 0 ? '合格' : '不合格'
        item01.score = (item01.score * 10 + item02.score * 10) / 10
        item.score = (item.score * 10 + item02.score * 10) / 10
      })
    })
  })
}

async function seekStart() {
  const { dateTime } = seekGroup.value
  loading.value = true
  const { data } = await apiGetInspectInfo({
    ...seekGroup.value,
    startTime: dateTime[0],
    endTime: dateTime[1]
  })
  loading.value = false
  data.forEach((item: DataItem) => {
    item.key = item.taskID
  })
  tableDataSource.value = data
  tableCurrent.value = 1
}
seekStart()

async function loadingExportFile(item) {
  message.loading('正在导出...')
  loading.value = true
  await getModalData(item)
  loading.value = false
  exportFile()
}

interface ExportData {
  area: string
  checkingProject: string
  checkingItem: string
}

function getTtemdataToArr(data) {
  var arrs: any = [];
  data.forEach((item) => {
    item.child.forEach((item01) => {
      item01.child.forEach((item02) => {
        var temp = {
          taskID: item02.taskID,
          managerName: item02.managerName,
          orgName: item02.orgName,
          area: item.name,
          checkingProject: item01.name,
          checkingItem: item02.name,
          score: item02.score,
          describe: item02.describe,
          type: item02.ex_type,
          submitData: item02.submitData,
          submitManName: item02.submitManName,
          submitTime: item02.submitTime
        }
        arrs.push(temp)
      })
    })
  })
  return arrs
}

function exportCheckdata(datas) {
  if (!datas.length) {
    message.error('没有可导出的数据！')
    loading.value = false
    return
  }
  var tarr = []
  datas.forEach((item) => {
    const { data } = item
    const t = getTtemdataToArr(data)
    tarr = tarr.concat(t)
  })
  const parms = {
    tableDatas: tarr,
    fileName: '报表导出',
    exclude: [],
    tableSheetHeader: EXPORTCOULMN
  }
  loading.value = false
  downloadExcel(parms)
}

/**
 * 选中导出
 */
async function selectRowExportFile() {
  message.loading('正在导出...')
  loading.value = true
  const parr = <any>[]
  selectRowTaskId.value.forEach((item) => {
    const t = apiGetInspectRecordByTaskID({
      "taskID": item
    })
    parr.push(t)
  })
  const res = await Promise.all(parr)
  res.forEach((item) => {
    const { data } = item
    processingData(data)
  })
  exportCheckdata(res)
}

/**
 * 导出
 */
async function exportFile() {
  if (!modalDataSource.value.length) {
    message.error('没有可导出的数据！')
    return
  }
  var arrs: ExportData[] = [];
  arrs = getTtemdataToArr(modalDataSource.value)
  const parms = {
    tableDatas: arrs,
    fileName: exportFileName,
    exclude: [],
    tableSheetHeader: EXPORTCOULMN
  }
  downloadExcel(parms)
}
</script>
<style lang="less">
.patrol-footer-btn {
  position: absolute;
  bottom: 21px;
  left: 0;
  z-index: 1;
}

.modal-wrappy {
  .button-box {
    text-align: right;
    padding-bottom: 10px;
  }

  .ant-modal-footer {
    display: none;
  }
}

.modalBox {
  padding-bottom: 15px;

  .ant-image {
    overflow: hidden;
    margin-right: 5px;
  }

  .ant-table-row-level-0,
  .ant-table-row-level-1 {
    background-color: #fafafa;
    font-weight: bold;
  }



}
</style>