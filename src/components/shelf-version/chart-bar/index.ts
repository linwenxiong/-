import { yAxis } from '../../../constants/echart-config'
export function useBarChart(data) {

  interface Vdata {
    xAxisData: string[],
    salesPrice: number[],
    salesNumber: number[],
    grossMargin: number[],
    sku: number[],
    displayResources: number[]
  }

  function getItemData(source) {
    return source.reduce((prev, cur) => {
      prev.xAxisData.push('V' + cur.patternVer)
      prev.salesPrice.push(cur.salesPrice)
      prev.salesNumber.push(cur.salesNumber)
      prev.grossMargin.push(cur.grossMargin)
      prev.sku.push(cur.sku)
      prev.displayResources.push(cur.displayResources)
      return prev
    },
      {
        xAxisData: [],
        salesPrice: [],
        salesNumber: [],
        grossMargin: [],
        sku: [],
        displayResources: []
      }
    )
  }

  const vdata: Vdata = getItemData(data)
  // console.log('---------', vdata)
  // var myChart = echarts.init(document.getElementById('main'), 'essos');

  var option;
  const labelOption = {
    show: true
  };

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },

    legend: {
      show: true,
      data: ['销售额', '销售数', '毛利额', 'SKU数', '陈列资源']
    },

    xAxis: [
      {
        position: "buttom",
        type: 'category',
        axisTick: { show: false },
        data: vdata.xAxisData
      }
    ],

    yAxis,
    series: [
      {
        name: '销售额',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: vdata.salesPrice
      },

      {
        name: '销售数',
        type: 'bar',
        yAxisIndex: 1,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },

        data: vdata.salesNumber
      },
      {
        name: '毛利额',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 2,

        data: vdata.grossMargin
      },
      {
        name: 'SKU数',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 3,

        data: vdata.sku
      },

      {
        name: '陈列资源',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 4,

        data: vdata.displayResources
      }
    ]
  };
  return {
    barOption: option
  }
  // option && myChart.setOption(option);
}