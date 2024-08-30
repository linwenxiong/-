<template>
  <div class="quality-manage-wrappy">
    <Seek :tableType="currentTabKey" :export-loading="exportLoading" @callback="callback" @exportBack="exportBack" />
    <a-spin :spinning="spinning">
      <!-- 内容 -->
      <a-tabs type="card" @change="tabChage">
        <a-tab-pane key="1" tab="评分内容">
          <PinfenConcise :dataSource="dataSource" :columns="pingfenColumns" @click="openDialog" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="评分明细">
          <PinfenAll :dataSource="pinfenDetails" />
        </a-tab-pane>
      </a-tabs>
    </a-spin>

    <!-- 弹窗 -->
    <a-modal class="quality-man-dialog" v-model:visible="visible" width="1300px" title="评分详情" okText="确定" cancelText="取消">
      <a-table :pagination="false" :scroll="{ y: 500 }" :dataSource="dialogDataSource" :columns="dialogColumns" bordered>
        <template v-slot:bodyCell="{ column, record, index }">
          <!-- 图片 -->
          <template v-if="column.dataIndex == 'image'">
            <div class="quality-imagebox" v-if="record.imglist.length">
              <a-image :width="50" :height="50" v-for="img, imgk in record.imglist" :key="imgk" :src="img" />
            </div>
            <span v-else>无</span>
          </template>

          <!-- 评分标准 -->
          <template v-if="column.dataIndex == 'biaozhun'">
            {{ record.biaozhun }}
            <div>
              <b style="font-size: 12px;" v-html="record.text"></b>
              <!-- <b>评分项：<span v-for="fens, fk in record.fenshulist" :key="fk">{{ fens.text }} </span></b> -->
            </div>
          </template>

          <!-- 打分 -->
          <template v-if="column.dataIndex == 'dafen'">
            <b>{{ record.dafen }}分</b>
            <b class="color-red" v-if="record.text[record.dafen] === '差'">（{{ record.text[record.dafen] }}）</b>
            <b class="color-green" v-if="record.text[record.dafen] === '优'">（{{ record.text[record.dafen] }}）</b>
            <b class="color-orange" v-if="record.text[record.dafen] === '中'">（{{ record.text[record.dafen] }}）</b>
          </template>

          <!-- 备注 -->
          <template v-if="column.dataIndex == 'beizhu'">
            <b class="pinfen-special-text">{{ record.beizhu }}</b>
          </template>
        </template>
      </a-table>
      <div style="text-align: right; padding: 38px 38px 0; font-weight: bold;">合计：{{ totalScore }}分</div>
    </a-modal>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import PinfenAll from './components/pinfen-all.vue'
import PinfenConcise from './components/pinfen-concise.vue'
import Seek from './components/seek.vue'
import { pingfenColumns, dialogPingfenColumns, pingfenAllColumns } from '@/constants/pinzhi-column.js'
import { apiGetPfbMenu, apiGetPfbByPfxm, apiGetPfbDetails } from '@/api'
import { downloadExcel } from '@/plugins/export-excel'
import { message } from 'ant-design-vue';
export default defineComponent({
  name: 'QualityManage',
  components: {
    PinfenAll,
    PinfenConcise,
    Seek
  },
  setup() {
    const exportLoading = ref(false)
    const spinning = ref(false)
    const currentTabKey = ref('1')
    const visible = ref(false)
    const textindex = ref(0)
    const dialogDataSource = ref([])
    const totalScore = ref(0)
    let seekParams = {}

    // 处理分数
    function combFs(fsarr) {
      let f = ['差', '中', '优']
      let obj = {}
      if (fsarr.length === 2) {
        f = ['差', '优']
      }
      fsarr.forEach((item, index) => {
        obj[item.value] = f[index]
      })
      return obj
    }

    // 获取评分详情弹窗
    async function openDialog(index, name, time) {
      spinning.value = true // 遮罩
      const res = await apiGetPfbByPfxm({
        czy: name,
        rq: time
      })
      totalScore.value = 0
      dialogDataSource.value = res.data.map((item) => {
        totalScore.value += item.fs
        const description = item.description.replace(/#/g, '<br>')
        return {
          key: item.pfID,
          project: item.pfxm,
          content: item.pfnr,
          biaozhun: item.pfbz,
          dafen: item.fs,
          fenshulist: item.fslist,
          imglist: item.tplist,
          beizhu: item.bz,
          // text: combFs(item.fslist)
          text: description
        }
      })
      spinning.value = false
      visible.value = true
      textindex.value = index
    }

    //  获取列表
    const dataSource = ref([])
    function getPfList() {
      apiGetPfbMenu(seekParams).then((res) => {
        const { data } = res
        dataSource.value = data.map((item) => {
          return {
            key: item.pfID,
            department: item.orgname,
            name: item.czy,
            time: item.rq,
            pinzhong: item.item,
            score: item.score,
            gysmc: item.gysmc
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }

    const pinfenDetails = ref([])
    //  获取评分详情列表
    async function getPfListDetails() {
      const res = await apiGetPfbDetails(seekParams)
      const { data } = res
      pinfenDetails.value = data.map((item) => {
        return {
          key: item.bzID,
          project: item.pfxm,
          content: item.pfnr,
          jigou: item.orgname,
          biaozhun: item.pfbz,
          user: item.czy,
          dafen: item.fs,
          time: item.rq,
          pinzhong: item.item,
          beizhu: item.bz
        }
      })
    }
    // 导出
    async function exportBack(e) {
      seekParams = e
      exportLoading.value = true
      await getPfListDetails()
      if (!pinfenDetails.value.length) {
        message.error('该日期暂无数据可导出')
        exportLoading.value = false
        return
      }
      const parms = {
        tableDatas: pinfenDetails.value,
        fileName: '评分明细',
        exclude: ['key'],
        tableSheetHeader: pingfenAllColumns
      }
      downloadExcel(parms)
      message.success('导出成功')
      exportLoading.value = false
    }
    function callback(e) {
      seekParams = e
      if (currentTabKey.value === '1') {
        getPfList()
        return
      }
      if (currentTabKey.value === '2') {
        getPfListDetails()
        return
      }
    }
    async function tabChage(e) {
      currentTabKey.value = e
      if (e === '2' && !pinfenDetails.value.length) {
        getPfListDetails()
        return
      }
    }
    getPfList()
    return {
      exportBack,
      callback,
      tabChage,
      openDialog,
      exportLoading,
      spinning,
      currentTabKey,
      pinfenDetails,
      totalScore,
      textindex,
      visible,
      dialogDataSource,
      dataSource,
      dialogColumns: dialogPingfenColumns,
      pingfenColumns
    }
  },
});
</script>
<style lang="less" >
.quality-man-dialog {
  .ant-modal-footer {
    display: none;
  }

  .color-red {
    color: red;
  }

  .color-green {
    color: green;
  }

  .color-orange {
    color: orange;
  }
}

.quality-manage-wrappy {
  .ant-spin-nested-loading>div>.ant-spin {
    top: 100px !important;
  }

  .ant-form-item {
    margin-top: 15px;
  }
}

.quality-imagebox {
  .ant-image {
    margin-right: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .ant-image-mask-info {
    display: none;
  }
}
</style>
    