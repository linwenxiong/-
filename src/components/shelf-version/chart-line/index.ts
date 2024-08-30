// 业绩历史趋势
export function useLineChart(data) {
  function getItemData(source) {
    return source.reduce((prev, cur) => {
      prev['costPrice'].push(cur.costPrice)
      prev['displayResources'].push(cur.displayResources)
      prev['gross'].push(cur.gross)
      prev['grossMargin'].push(cur.grossMargin)
      prev['salesNumber'].push(cur.salesNumber)
      prev['salesPrice'].push(cur.salesPrice)
      prev['sku'].push(cur.sku)
      prev['busDate'].push(cur.busDate)
      return prev
    }, {
      costPrice: [],
      displayResources: [],
      gross: [],
      grossMargin: [], //毛利率/损耗率
      salesNumber: [], //销售数
      salesPrice: [], //销售额
      sku: [],
      busDate: []
    })
  }

  const {
    costPrice,
    displayResources,
    gross,
    grossMargin,
    salesNumber,
    salesPrice,
    sku,
    busDate
  } = getItemData(data)

  var lineBoxOption;
  lineBoxOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售额', '销售数', '毛利额', 'SKU数', '陈列资源']
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: busDate
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    series: [
      {
        name: '销售额',
        smooth: true,
        symbolSize: 8,

        type: "line",
        itemStyle: {
          // color: "#37a8fa"
        },
        data: salesPrice
      },
      {
        name: '销售数',
        smooth: true,
        symbolSize: 8,
        data: salesNumber,
        type: "line",
        itemStyle: {
          // color: "#748ede"
        },
      },
      {
        name: '毛利额',
        smooth: true,
        symbolSize: 8,
        data: grossMargin,
        type: "line",
        itemStyle: {
          // color: '#91cc75'
        },
      },
      {
        name: 'SKU数',
        smooth: true,
        symbolSize: 8,
        data: sku,
        type: "line",
        itemStyle: {
          // color: '#f6dc7d'
        },
      },
      {
        name: '陈列资源',
        symbolSize: 8,
        smooth: true,
        data: displayResources,
        type: "line",
        itemStyle: {
          // color: '#ee6666'
        },
      }
    ]
  }
  // echartsDom && echartsDom.setOption(lineBoxOption);
  return { lineBoxOption }
}

