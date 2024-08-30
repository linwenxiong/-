/**
 * 饼图
 */
export function usePieChart(data) {

  function getItemData(source) {
    return source.reduce((prev, cur) => {
      prev.legendData.push(cur.smallClass + cur.smallClassName)
      prev.piedata.push({
        value: cur.saleNum,
        name: cur.smallClass + cur.smallClassName
      })
      return prev
    },
      {
        legendData: [],
        piedata: []
      }
    )
  }

  const vdata = getItemData(data)
  var pieBoxOption;
  pieBoxOption = {

    tooltip: {
      trigger: 'item'
    },

    legend: {
      orient: "vertical",
      left: "left",
      data: vdata.legendData
    },

    series: [{
      // left: '20%',
      type: "pie",
      selectedMode: true,
      // width: "80%",
      radius: '90%',
      label: {
        show: true,
      },

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      labelLine: {
        show: true
      },
      data: vdata.piedata
    }]
  }
  return {
    pieBoxOption
  }

}