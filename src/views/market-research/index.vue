<template>
  <section class="market-research-wrappy">
    <!-- <div class="market-research-header-tabbtn">
            <a-radio-group v-model:value="tabCurrent" button-style="solid">
                <a-radio-button :value="9">全部</a-radio-button>
                <a-radio-button :value="0">未确认</a-radio-button>
                <a-radio-button :value="1">待执行</a-radio-button>
                <a-radio-button :value="2">执行中</a-radio-button>
                <a-radio-button :value="3">已执行</a-radio-button>
            </a-radio-group>
        </div> -->

    <div>
      <a-form layout="inline" style="margin-top: 15px">
        <a-form-item label="任务ID">
          <a-input placeholder="请输入任务ID" v-model:value="taskSeekInput"></a-input>
        </a-form-item>
        <a-form-item label="时间">
          <date-picker v-model:value="dateTime" />
        </a-form-item>
        <a-button type="primary" html-type="submit" @click="seekStart">搜 索</a-button>
        <!-- <a-button type="primary" style="margin-left: 5px" @click="exportFile">导出报表</a-button> -->
        <!-- <a-button type="primary" style="margin-left: 5px" @click="daochu">导出报表</a-button> -->
      </a-form>
    </div>

    <!-- <div class="market-research-header-tabbtn">
      <a-radio-group v-model:value="tableType" button-style="solid">
        <a-radio-button value="调查记录">调查记录</a-radio-button>
        <a-radio-button value="任务列表">任务列表</a-radio-button>
      </a-radio-group>
    </div> -->
    <!-- --------------------任务列表-------------------- -->
    <a-table class="market-research-table-content" :bordered="true" :dataSource="taskDataSource" :columns="taskcolumns"
      :pagination="false">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'operate'">
          <div class="details" @click="getdetails(record.taskID, record.taskName, taskStatusG[record.taskState])">查看详情
          </div>
        </template>

        <template v-if="column.dataIndex == 'taskState'">
          {{ taskStatusG[record.taskState] }}
        </template>
      </template>
    </a-table>

    <div class="market-titles">
      <h2>{{ taskName }}</h2>
      <a-form layout="inline">
        <a-form-item label="执行日期">
          <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="startTime"
            @change="startTimeChange" />
        </a-form-item>
      </a-form>
    </div>




    <!-- --------------------调查记录-------------------- -->
    <a-table class="market-research-table-content" :bordered="true" :loading="loading"
      :pagination="{ hideOnSinglePage: true, current: dialogCurrent }" :dataSource="dataSource" :columns="columns"
      :scroll="{ x: 1200, y: 600 }" @change="tableChange">
      <template v-slot:headerCell="{ column }">
        <template v-if="column.key === 'zhishu'">
          <a-tooltip>
            <template v-slot:title>价格指数 (门店价格/竞争对手价格*100)</template>
            {{ column.title }}
          </a-tooltip>
        </template>
      </template>
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'orgPrice'">
          <arrow-up-outlined :style="{ color: 'red' }" v-if="(+record.orgPrice) > (+record.salePrice)" />
          <arrow-down-outlined :style="{ color: '#0b770f' }" v-else />{{ record.orgPrice }}
        </template>
        <template v-if="column.dataIndex === 'taskState'">
          <span :class="'colors' + record.taskState">{{
            taskStatusG[record.taskState]
          }}</span>
        </template>
        <template v-if="column.dataIndex === 'picList'">
          <div class="market-research-img">
            <a-image :width="50" :height="50" v-for="(img, imgk) in record.picList" :key="imgk" :src="img" />
          </div>
        </template>
        <template v-if="column.dataIndex === 'priceType'">
          {{ record.priceType === '不调价' || !record.priceType ? '' : '调整' }}{{ record.priceType }}
        </template>
      </template>
    </a-table>
    <!-- --------------------任务列表-------------------- -->
    <!-- <a-talle v-if="tableType === '任务列表'" :dataSource="dataSource" :columns="columns"></a-talle> -->
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import { downloadExcel } from "../../plugins/export-excel";
import { apiMarketSurveyGetTask, apiMarketSurveyGetAll } from "../../api/modules/operate";
import { columns, taskcolumns } from "../../constants/market-column";
import DatePicker from "../../components/date-picker/index.vue";
import { lindownload } from "../../plugins/lexport-excel";
import { getDate } from '../../common/utils'
export default defineComponent({
  name: "MarketResearch",
  components: {
    DatePicker,
    ArrowUpOutlined,
    ArrowDownOutlined
  },
  setup() {
    const dialogCurrent = ref(1)
    const taskObj = ref({ id: '', time: '' });
    const startTime = ref('');
    const loading = ref(false);
    const taskName = ref('-----');
    const dateTime = ref(<string[]>[]);
    const tableType = ref("调查记录");
    const tabCurrent = ref(9);
    const dataSource = ref([]);
    const taskDataSource = ref(<any>[]);
    const taskList = ref(<any>[]);
    const taskSeekInput = ref("");

    function tableChange(e) {
      dialogCurrent.value = e.current
    }


    function daochu() {
      const parms = {
        tableDatas: dataSource.value,
        fileName: "商品市调数据导出",
        exclude: [
          "key",
          "isDelete",
          "rexecutor",
          "overTime",
          "xh",
          "createDpt",
          "assignTime",
          "classCode",
          "execMode",
          "executor",
          "assignMode",
          "taskID",
          "taskState",
          "organs",
          "goods",
          "researchs",
        ],
        tableSheetHeader: columns,
      };
      downloadExcel(parms);
    }
    function exportFile() {
      lindownload({
        tableData: dataSource.value,
        tableTitleList: columns,
        fileName: "市调数据分析报表",
        tabName: "tab",
        imgkey: 'picList'
      });
    }
    async function marketSurveyGetAll({ startTime, endTime }) {
      const res = await apiMarketSurveyGetAll({
        taskID: taskSeekInput.value || 0,
        startTime,
        endTime
      })
      const { data } = res
      taskDataSource.value = data
    }

    function getdetails(id, taskname, status) {
      taskObj.value.id = id
      taskName.value = taskname + '-' + (status || '')
      getMarketSurveyGetTask()
    }

    function startTimeChange(time) {
      getMarketSurveyGetTask(time)
      dialogCurrent.value = 1
    }

    async function getMarketSurveyGetTask(time = '') {
      loading.value = true
      const res = await apiMarketSurveyGetTask({ taskID: taskObj.value.id, time });
      const { data } = res;
      dataSource.value = data;
      loading.value = false
    }

    function seekStart() {
      const [startTime, endTime] = dateTime.value
      marketSurveyGetAll({
        startTime,
        endTime
      })
    }

    watch(() => [getDate()], (val) => {
      dateTime.value = [val[0], val[0]]
      // dateTime.value = ['2023-10-20', '2023-11-01']
      seekStart()
    }, { immediate: true })


    return {

      tableChange,
      dialogCurrent,
      getdetails,
      startTimeChange,
      startTime,
      loading,
      taskName,
      getMarketSurveyGetTask,
      seekStart,
      dateTime,
      taskSeekInput,
      taskList,
      tableType,
      exportFile,
      taskStatusG: {
        "0": "未确认",
        "1": "待执行",
        "2": "执行中",
        "3": "已完结",
      },
      daochu,
      tabCurrent,
      dataSource,
      taskDataSource,
      columns,
      taskcolumns,
    };
  },
});
</script>
<style lang="less">
.market-research-wrappy {
  .market-titles {
    text-align: center;
    margin: 0;
    padding-top: 10px;

    .ant-form {
      justify-content: center;
    }
  }

  .market-research-header-tabbtn {
    margin-top: 15px;

    .ant-btn {
      margin-right: 10px;
      height: 30px;
      padding: 0 20px;
    }
  }

  .market-research-img {
    .ant-image {
      margin-right: 5px;
      margin-bottom: 5px;
      overflow: hidden;
    }

    .ant-image-mask-info {
      display: none;
    }
  }

  .market-research-table-content {
    padding-top: 15px;

    .details {
      font-size: 12px;
      cursor: pointer;
      text-decoration: underline;
      color: #32a1ff;
    }
  }

  .colors0 {
    color: red;
  }

  .colors1 {
    color: orange;
  }

  .colors2 {
    color: blue;
  }

  .colors3 {
    color: green;
  }
}
</style>
