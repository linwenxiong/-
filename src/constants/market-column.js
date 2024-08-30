const customRender = ({ text, record, index, column }) => {
  if (!text) {
    return "-";
  }
};
export const columns = [

  {
    title: "单品名",
    fixed: "left",
    width: 100,
    dataIndex: "goodsName",
    key: "goodsName",
  },

  {
    title: "条码",
    width: 100,
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "产地",
    width: 100,
    dataIndex: "producer",
    key: "producer",
  },
  {
    title: "规格",
    width: 80,
    dataIndex: "spec",
    key: "spec",
    customRender,
  },
  {
    title: "单位",
    width: 60,
    dataIndex: "unit",
    key: "unit",
    customRender,
  },
  {
    title: "部门",
    width: 100,
    dataIndex: "dept",
    key: "dept",
    customRender,
  },
  {
    title: "执行时间",
    width: 100,
    dataIndex: "etime",
    key: "etime",
  },
  {
    title: "创建人",
    width: 80,
    dataIndex: "verifyMan",
    key: "verifyMan",
  },
  {
    title: "门店",
    dataIndex: "organ",
    key: "organ",
    width: 62,
    customRender,
    sorter: {
      compare: (a, b) => a.organ - b.organ,
    },
  },
  {
    title: "市调人员",
    width: 100,
    dataIndex: "executor",
    key: "executor",
    customRender,
  },


  // {
  //   title: "状态",
  //   width: 80,
  //   dataIndex: "taskState",
  //   key: "taskState",
  // },


  {
    title: "目标市场",
    dataIndex: "targetMarket",
    width: 100,
    key: "targetMarket",
    customRender,
  },
  {
    title: "当天门店价格",
    width: 80,
    dataIndex: "orgPrice",
    key: "orgPrice",
    sorter: {
      compare: (a, b) => a.orgPrice - b.orgPrice,
    },
    customRender,
  },
  {
    title: "当天竞争门店价格",
    width: 80,
    dataIndex: "salePrice",
    key: "salePrice",
    sorter: {
      compare: (a, b) => a.salePrice - b.salePrice,
    },
    customRender,
  }, {
    title: "是否跟价",
    width: 100,
    dataIndex: "priceType",
    key: "priceType",
  },
  {
    title: "新售价",
    width: 100,
    dataIndex: "newPrice",
    key: "newPrice",
  },
  {
    title: "调价核准人",
    width: 100,
    dataIndex: "valuerMan",
    key: "valuerMan",
  },
  // {
  //   title: "价格指数",
  //   width: 100,
  //   dataIndex: "zhishu",
  //   key: "zhishu",
  //   customRender,
  // },
  {
    title: "市调图片",
    width: 150,
    dataIndex: "picList",
    key: "picList",
    customRender,
  },
  {
    title: "市调描述",
    width: 150,
    dataIndex: "description",
    key: "description",
  },

];

export const taskcolumns = [
  {
    title: "任务ID",
    dataIndex: "taskID",
    key: "taskID",
  },
  {
    title: "任务名称",
    dataIndex: "taskName",
    key: "taskName",
  },
  {
    title: "任务属性",
    dataIndex: "taskAttri",
    key: "taskAttri",
  },
  {
    title: "创建部门",
    dataIndex: "createDpt",
    key: "createDpt",
  },
  {
    title: "创建人",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "任务类型",
    dataIndex: "execMode",
    key: "execMode",
  },
  {
    title: "指派方式",
    dataIndex: "assignMode",
    key: "assignMode",
  },
  {
    title: "执行部门",
    dataIndex: "executor",
    key: "executor",
  },
  {
    title: "任务状态",
    dataIndex: "taskState",
    key: "taskState",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
  },
]