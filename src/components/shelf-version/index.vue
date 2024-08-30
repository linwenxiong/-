<template>
  <section class="version-wrappy">
    <h3 style="text-align: center; font-weight: bold;">
      {{ organ }}店 - {{ name }}
    </h3>
    <div class="row-title">业绩概述</div>
    <div class="row-layer">
      <div class="row-layer__item">
        <h2>销售额(元)</h2>
        <h1>{{ headerData.salesPrice }}</h1>
      </div>
      <div class="row-layer__item">
        <h2>销售数</h2>
        <h1>{{ headerData.salesNumber }}</h1>
      </div>
      <div class="row-layer__item">
        <h2>毛利额(元)</h2>
        <h1>{{ headerData.grossMargin }}</h1>
      </div>
      <div class="row-layer__item">
        <h2>陈列资源(cm)</h2>
        <h1>{{ headerData.displayResources }}</h1>
      </div>
      <div class="row-layer__item">
        <h2>SKU数</h2>
        <h1>{{ headerData.sku }}</h1>
      </div>
    </div>
    <div class="row-title">
      业绩历史趋势
      <div class="time-box">
        <a-form-item label="选择时间">
          <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="selectTime[0]"
            @change="timeChange" />
          -
          <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="selectTime[1]"
            @change="timeChange" />
        </a-form-item>
      </div>
    </div>

    <div id="line-box" style="height: 400px;"></div>
    <div class="row-title">版本业绩对比</div>
    <div id="main" style="height:400px;"></div>
    <div class="classbie-box">
      <div style="flex:1;">
        <div class="row-title">品类别业绩对比分析</div>
        <div style="height: 400px;" id="bar-box"></div>
      </div>
    </div>
    <div>
      <div class="row-title">品类别SKU占比</div>
      <div class="bing-box" id="pie-box" style="height:500px;"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref, inject } from 'vue'
import * as echarts from 'echarts';
// import { useTransition, TransitionPresets } from '@vueuse/core'
import essos from './essos.json'
import { useLineChart, usePieChart, useBarChart, useCategoryBar } from './index'
import { ShelfPrams } from '../../interface'

const props = defineProps({
  time: {
    type: Array,
    default: () => []
  },
  organ: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  headerData: {
    type: Object,
    default: () => { }
  },
  versionData: {
    type: Array,
    default: () => []
  },
  skuData: {
    type: Array,
    default: () => []
  },
  classData: {
    type: Array,
    default: () => []
  }
})

let lineBox, barCharts, pieBox, classBarChart;
const selectTime = ref(<any>[])
const { lineBoxOption } = useLineChart(props.data)
const { barOption } = useBarChart(props.versionData) // 版本业绩对比
const { pieBoxOption } = usePieChart(props.skuData)
const { classBarChartOption } = useCategoryBar(props.classData)

const { getHistoricaltrends, shelfPrams } = inject('historicaltrends',
  {
    getHistoricaltrends: <any>null,
    shelfPrams: <ShelfPrams>{}
  });

onMounted(() => {
  echarts.registerTheme('essos', essos)
  lineBox = echarts.init(document.getElementById('line-box'), 'essos');
  classBarChart = echarts.init(document.getElementById('bar-box'), 'essos');
  pieBox = echarts.init(document.getElementById('pie-box'), 'essos');
  barCharts = echarts.init(document.getElementById('main'), 'essos');

  lineBox && lineBox.setOption(lineBoxOption);
  barCharts && barCharts.setOption(barOption);
  pieBox && pieBox.setOption(pieBoxOption);
  classBarChart && classBarChart.setOption(classBarChartOption);
})

function timeChange() {
  getHistoricaltrends(shelfPrams.patternCD, shelfPrams.patternID, shelfPrams.shelfNum, shelfPrams.organ, selectTime.value[0], selectTime.value[1])
}

watch(() => [props.time], () => {
  selectTime.value = props.time
}, {
  immediate: true
})

watch(() => [props.data], () => {
  const { lineBoxOption } = useLineChart(props.data)
  lineBox.setOption(lineBoxOption);
})

watch(() => [props.versionData], () => {
  const { barOption } = useBarChart(props.versionData) // 版本业绩对比
  barCharts && barCharts.setOption(barOption);
})

watch(() => [props.skuData], () => {
  const { pieBoxOption } = usePieChart(props.skuData)
  pieBox && pieBox.setOption(pieBoxOption);

  const { classBarChartOption } = useCategoryBar(props.classData)
  classBarChart && classBarChart.setOption(classBarChartOption);
})


</script>
<style lang="less" scoped>
.bing-box {
  padding-left: 25px;
}

.row-layer {
  display: flex;
  border-bottom: 1px solid #efefef;

  &__item {
    flex: 1;
    border-right: 1px solid #efefef;
    padding-left: 21px;
  }
}

.row-title {
  font-weight: bold;
  font-size: 22px;
  line-height: 55px;
}

.classbie-box {
  display: flex;
}
</style>