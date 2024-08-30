import { yAxis } from '../../../constants/echart-config-category'
export function useCategoryBar(data) {

  function getItemData(source) {
    return source.reduce((prev, cur) => {
      prev.xAxisData.push(cur.smallClassName)
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
  const vdata = getItemData(data)
  console.log(vdata, 8899)
  var classBarChartOption;
  classBarChartOption = {
    tooltip: {},
    legend: {
      show: true,
      data: ['销售额', '销售数', '毛利额', 'SKU数', '陈列占比(%)']
    },
    xAxis: [
      {
        position: "buttom",
        type: 'category',
        axisTick: { show: false },
        data: vdata.xAxisData
      }
    ],
    yAxis: yAxis,
    series: [
      {
        emphasis: {
          focus: 'series'
        },
        name: "销售额",
        type: "bar",
        data: vdata.salesPrice,
      },
      {
        emphasis: {
          focus: 'series'
        },
        name: "销售数",
        type: "bar",
        yAxisIndex: 1,
        data: vdata.salesNumber
      },
      {
        emphasis: {
          focus: 'series'
        },
        name: "毛利额",
        type: "bar",
        yAxisIndex: 2,
        data: vdata.grossMargin
      },
      {
        emphasis: {
          focus: 'series'
        },
        name: "SKU数",
        type: "bar",
        yAxisIndex: 3,
        data: vdata.sku
      },
      {
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 4,
        name: "陈列占比(%)",
        type: "bar",
        data: vdata.displayResources
      },
    ]
  }
  return {
    classBarChartOption
  }
}