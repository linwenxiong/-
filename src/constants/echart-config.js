var colors = ['#37a8fa', '#748ede', '#91cc75', '#f6dc7d', '#ee6666']
export const yAxis = [
  {
    type: 'value',
    alignTicks: true,
    name: '销售额',
    offset: 11.5,
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
  },

  {
    position: 'left',
    type: 'value',
    alignTicks: true,
    name: '销售数',
    offset: 65,
    axisTick: {
      inside: true,
      show: true,
    },
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
    alignTicks: true,
    name: '毛利额',
    offset: 10,
    axisTick: {
      inside: true,
      show: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[2]
      }
    }
  },

  {
    type: 'value',
    alignTicks: true,
    name: 'SKU数',
    offset: 55,
    axisTick: {
      inside: true,
      show: true
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[3]
      }
    }
  },

  {
    type: 'value',
    alignTicks: true,
    name: '陈列资源',
    offset: 109,
    axisTick: {
      inside: true,
      show: true
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[4]
      }
    },
    axisLabel: {
      formatter: '{value} cm'
    }
  }
]