<template>
  <div class="shelf-analysis-wrappy">
    <h2 class="titles">货架查询</h2>
    <self-query :column="queryColumn" v-model:value="seekGroup" @seekClick="seekStart"></self-query>
    <div class="shelf-analysis-table">
      <a-table :dataSource="shelfTableDataSource" :columns="shelfTableColumns" :loading="loading" bordered
        :pagination="{ hideOnSinglePage: true }">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'control'">
            <div class="shelf-item-control">
              <div class="shelf-analysis-see-btn"
                @click="showDataDialog(record.patternCD, record.patternID, record.shelfNum, record.organ, record.shelfCD)">
                查看数据报表
              </div>
              <div class="shelf-analysis-see-btn"
                @click="showStockDialog(record.patternCD, record.patternID, record.shelfNum, record.organ, record.shelfCD)">
                查看库存报表
              </div>
              <div @click="exportFile(record.patternCD, record.patternID, record.shelfNum, record.organ)"
                class="shelf-analysis-report-btn">
                导出数据表
              </div>
              <div @click="exportStockFile(record.patternCD, record.patternID, record.shelfNum, record.organ)"
                class="shelf-analysis-report-btn">
                导出库存表
              </div>
              <div class="shelf-analysis-report-btn"
                @click="showVsdialog(record.patternCD, record.patternID, record.shelfNum, record.organ, record.shelfCD)">
                货架数据分析
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <!-- 弹窗 -->
    <a-modal v-model:visible="visible" width="1380px" :bodyStyle="{ 'padding-bottom': '0' }">
      <template v-slot:footer>
        <div>
          <a-button type="primary" @click="download">导出</a-button>
        </div>
      </template>
      <h2 style="color: red;">{{ dtitle }}</h2>
      <a-table :dataSource="dialogTableDataSource" :columns="dialogTableColumns" bordered :scroll="{ y: 500 }"
        @change="tableChange" :pagination="{ hideOnSinglePage: true, current: dialogCurrent }">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'productName'">
            <div :class="{ 'font-red': seekGroup.barcode === record.barcode }">
              {{ record.productName }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'grossMargin'">
            {{ record.grossMargin }}%
          </template>
          <template v-if="column.dataIndex === 'lossMargin'">
            {{ record.lossMargin }}%
          </template>
        </template>
      </a-table>
    </a-modal>

    <!-- 折线图弹窗 -->
    <a-modal v-model:visible="KdVisible" width="90%" style="top:15px">
      <ShelfVersion :name="shelfName" :organ="shelfOrgan" :data="cversionData" :header-data="performanData"
        :version-data="versionData" :sku-data="skuData" :class-data="classPerformanData" :time="time">
      </ShelfVersion>
    </a-modal>

  </div>
</template>
<script setup lang="ts">
import { ref, provide } from 'vue'
// import { useMouse } from '@vueuse/core'
import { message } from 'ant-design-vue'
import selfQuery from '../../components/self-query.vue'
import ShelfVersion from '../../components/shelf-version/index.vue'
import { apiShelfGetByBarcode, apiGetSaleInfoByDay, apiGetSaleInfoByAllVersion, apiGetSkuSale, apiGetSaleInfoByCls } from '../../api'
import { shelfTableColumns, queryColumn } from '../../constants/shelf-constants'
import { downloadExcel } from '../../plugins/export-excel'
import { getGoodsStock } from './business/useStock'
import { useDataFn } from './business/useData'
import { SeekGroup } from '../../interface'
import { setTimeframeofonemonth } from '../../common/utils'

const dialogCurrent = ref(1)
const docName = ref('')
const loading = ref(false)
const seekGroup = ref(<SeekGroup>{})
const visible = ref(false)
const KdVisible = ref(false)
const shelfTableDataSource = ref([])
const dialogTableDataSource = ref([])
const cversionData = ref([])
const performanData = ref({})
const versionData = ref([])
const shelfName = ref('')
const shelfOrgan = ref('')
const skuData = ref([])
const classPerformanData = ref([])
const time = ref([''])
const shelfPrams = {
  patternCD: '',
  patternID: 0,
  shelfNum: 0,
  organ: ''
}

async function showVsdialog(patternCD, patternID, shelfNum, organ, shelfCD) {
  loading.value = true
  shelfName.value = shelfCD
  shelfOrgan.value = organ
  const [startDay, endDay] = setTimeframeofonemonth()
  time.value = [startDay, endDay]
  const res = await Promise.all([
    getHistoricaltrends(patternCD, patternID, shelfNum, organ, startDay, endDay),
    getSaleInfoByAllVersion(patternCD, patternID, shelfNum, organ),
    getSkuSale(patternID, shelfNum),
    getSaleInfoByCls(patternCD, patternID, shelfNum, organ)
  ])
  const [res1, res2, res3, res4] = res
  console.log(res4, '-----------res4')
  performanData.value = res2.length ? res2[res2.length - 1] : [] //业绩概述
  versionData.value = res2 // 版本业绩对比
  skuData.value = res3 // 品类别SKU占比
  classPerformanData.value = res4 // 品类别业绩对比分析
  KdVisible.value = true
  loading.value = false
}


/**
 * 货架内商品按小类获取销售信息
 */
async function getSaleInfoByCls(patternCD, patternID, shelfNum, organ) {
  const { data } = await apiGetSaleInfoByCls({
    patternCD,
    patternID,
    shelfNum,
    organ
  })
  return data
}

/**
 * 货架内商品sku比例
 */
async function getSkuSale(patternID: number, shelfNum: number) {
  const { data } = await apiGetSkuSale({
    patternID,
    shelfNum
  })
  return data
}

/**
 * 所有版本的销售总数据
 */
async function getSaleInfoByAllVersion(patternCD, patternID, shelfNum, organ,) {
  const { data } = await apiGetSaleInfoByAllVersion({ patternCD, patternID, shelfNum, organ, })
  return data
}

/**
 * 业绩历史趋势
 */
async function getHistoricaltrends(patternCD, patternID, shelfNum, organ, startDay, endDay) {
  shelfPrams.patternCD = patternCD
  shelfPrams.patternID = patternID
  shelfPrams.shelfNum = shelfNum
  shelfPrams.organ = organ
  const { data } = await apiGetSaleInfoByDay({ patternCD, patternID, shelfNum, organ, startDay, endDay })
  cversionData.value = data //业绩历史趋势 
}

provide('historicaltrends', { getHistoricaltrends, shelfPrams })

function tableChange(e) {
  dialogCurrent.value = e.current
}

async function seekStart() {
  loading.value = true
  const params = {
    barcode: seekGroup.value.barcode
  }
  const res = await apiShelfGetByBarcode(params)
  const { data } = res
  shelfTableDataSource.value = data
  setTimeout(() => {
    loading.value = false
  }, 300)
}

const { dialogDataTableColumns, getPatternSaleReportByDays } = useDataFn()
const dialogTableColumns = ref<any>([])
const dtitle = ref('')
/**
 * 数据报表弹窗
 */
async function showDataDialog(patternCD, patternID, shelfNum, organ, patternName) {
  dialogTableColumns.value = dialogDataTableColumns
  const [startDay, endDay] = seekGroup.value.times
  const data = await getPatternSaleReportByDays(patternCD, patternID, shelfNum, organ, startDay, endDay)
  dialogTableDataSource.value = data
  visible.value = true
  docName.value = patternCD
  dtitle.value = '商品销售数据（' + patternName + '）'
  dialogCurrent.value = 1
}
/**
 * 库存报表弹窗
 */
async function showStockDialog(patternCD, patternID, shelfNum, organ, patternName) {
  const { data, stockTableColumns } = await getGoodsStock(patternCD, patternID, shelfNum, organ)
  dialogTableColumns.value = stockTableColumns
  dialogTableDataSource.value = data
  visible.value = true
  docName.value = patternCD + '（库存表）'
  dtitle.value = '商品库存数据（' + patternName + '）'
  dialogCurrent.value = 1
}
// 导出库存表
async function exportStockFile(patternCD, patternID, shelfNum, organ) {
  const { data, stockTableColumns } = await getGoodsStock(patternCD, patternID, shelfNum, organ)
  docName.value = patternCD + '（库存表）'
  dialogTableDataSource.value = data
  dialogTableColumns.value = stockTableColumns
  download()
}
// 导出数据表
async function exportFile(patternCD, patternID, shelfNum, organ) {
  const [startDay, endDay] = seekGroup.value.times
  const data = await getPatternSaleReportByDays(patternCD, patternID, shelfNum, organ, startDay, endDay)
  docName.value = patternCD
  dialogTableDataSource.value = data
  dialogTableColumns.value = dialogDataTableColumns
  download()
}
function download() {
  if (!dialogTableDataSource.value.length) {
    message.error('没有可导出的数据！')
    return
  }
  const parms = {
    tableDatas: dialogTableDataSource.value,
    fileName: docName.value,
    exclude: ['gross', 'costPrice'],
    tableSheetHeader: dialogTableColumns.value
  }
  downloadExcel(parms);
}

</script>
<style lang="less">
.ant-table-cell .font-red {
  color: red;
  font-weight: bold;
  // background-color: red;
}

.shelf-analysis-wrappy {

  .shelf-item-control {
    display: flex;
  }

  .shelf-analysis-report-btn {
    font-size: 12px;
    text-decoration: underline;
    color: #319500;
    cursor: pointer;
    margin-left: 10px;
  }

  .shelf-analysis-see-btn {
    margin-left: 10px;
    font-size: 12px;
    text-decoration: underline;
    color: #1890ff;
    cursor: pointer;
  }

  .shelf-analysis-table {
    margin-top: 15px;
    position: relative;
  }

  .titles {
    margin-top: 15px;
  }

  .ant-form-item-control-input-content {
    display: flex;

    .ant-picker {
      flex: 1;
    }

    .shelf-jl {
      padding: 0 6px;
    }
  }

  .shelf-analysis-header {
    display: flex;
  }

  .shelf-analysis-header-left {
    flex: 1;
  }

  .shelf-analysis-header-right {
    width: 150px;
    border-left: 1px solid #e3e3e3;
    padding-left: 19px;

    .button {
      margin-top: 10px;
    }
  }

  .ant-form-item {
    margin-right: 29px !important;
    width: 30%;
    margin-bottom: 15px !important;

    .ant-form-item-label {
      width: 100px;
    }
  }
}
</style>