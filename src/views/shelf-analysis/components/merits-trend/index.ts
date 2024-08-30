import * as echarts from 'echarts';
export const useMeritsTrend = (datas)=>{
  let dateTime:any = [] // 日期
  let salesNumber:any = []  // 销售数
  let gross:any = []  // 销售额
  let grossMargin:any = [] //毛利额
  let skuNumber:any = [] //sku
  let chenlie:any= [] //陈列资源
  function getSalesData() {
    datas.forEach((item)=>{
      salesNumber.push(item.salesNumber)
      gross.push(item.gross)
      grossMargin.push(item.grossMargin)
      skuNumber.push(0)
      chenlie.push(0)
      dateTime.push(item.busDate.replace(/-/g, '/'))
    })
  }
 getSalesData()
  var lineBox = echarts.init(document.getElementById('line-box'), 'essos');
  let base = +new Date('2023/09/02');
  let oneDay = 24 * 3600 * 1000;
  let date: any[] = [];

  for (let i = 1; i < 20; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  }



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
      data: dateTime
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
          color: "#37a8fa"
        },
        data: gross
      },
      {
        name: '销售数',
        smooth: true,
        symbolSize: 8,
        data: salesNumber,
        type: "line",
        itemStyle: {
          color: "#748ede"
        },
      },
      {
        name: '毛利额',
        smooth: true,
        symbolSize: 8,
        data: grossMargin,
        type: "line",
        itemStyle: {
          color: '#91cc75'
        },
      },
      {
        name: 'SKU数',
        smooth: true,
        symbolSize: 8,
        data: skuNumber,
        type: "line",
        itemStyle: {
          color: '#f6dc7d'
        },
      },
      {
        name: '陈列资源',
        symbolSize: 8,
        smooth: true,
        data: chenlie,
        type: "line",
        itemStyle: {
          color: '#ee6666'
        },
      }
    ]
  }
  lineBoxOption && lineBox.setOption(lineBoxOption);


  return {
    name:12312
  }
}