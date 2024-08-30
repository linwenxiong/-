var colors = ['#37a8fa', '#748ede', '#91cc75', '#f6dc7d', '#ee6666']
export const yAxis = [
  {
    type: 'value',
    position: 'left',
    name: '销售额',
    alignTicks: true,
    axisTick: {
      inside: true,
      show: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[0]
      }
    },
    axisLabel: {
      formatter: '{value}'
    }
  },
  {
    type: 'value',
    position: 'left',
    name: '销售数',
    alignTicks: true,
    offset: 50,
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[1]
      }
    },
    axisLabel: {
      formatter: '{value}'
    }
  },
  {
    type: 'value',
    position: 'right',
    name: '毛利额',
    alignTicks: true,
    offset: 0,
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[2]
      }
    },
    axisLabel: {
      formatter: '{value}'
    }
  },
  {
    type: 'value',
    position: 'right',
    name: 'SKU数',
    alignTicks: true,
    offset: 50,
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[3]
      }
    },
    axisLabel: {
      formatter: '{value}'
    }
  },
  {
    type: 'value',
    position: 'right',
    name: '陈列占比(%)',
    alignTicks: true,
    offset: 110,
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[4]
      }
    },
    axisLabel: {
      formatter: '{value}%'
    }
  },
]