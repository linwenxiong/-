import { apiGetPatternSaleReportByDay } from '../../../api'
import { dialogDataTableColumns } from '../../../constants/shelf-constants'
import { usePermissionStore } from '../../../stores/index'
import { DialogDataTableColumnsItem } from '../../../interface'
/**
 * 货架商品业绩数据
 * @param patternCD 货架ID
 * @param patternID 模板ID(唯一)
 * @param shelfNum 
 * @param organ 门店
 * @param startDay 开始时间
 * @param endDay 结束时间
 */
export function useDataFn() {
  const permission = usePermissionStore()
  async function getPatternSaleReportByDays(patternCD, patternID, shelfNum, organ, startDay, endDay) {
    const res = await apiGetPatternSaleReportByDay({
      patternCD,
      patternID,
      shelfNum, 
      organ, 
      startDay,
      endDay
    })
    const { data } = res
    return data
  }
  // 通过权限列表获取table展示的列
  function getChenliePermissionTableColumn() {
    const columns = {
      'grossMargin': {
        title: '毛利率%',
        dataIndex: 'grossMargin',
        key: 'grossMargin',
        sorter: {
          compare: (a, b) => a.grossMargin - b.grossMargin
        }
      },
      'salesNumber': {
        title: '销售数量',
        dataIndex: 'salesNumber',
        key: 'salesNumber',
        sorter: {
          compare: (a, b) => a.salesNumber - b.salesNumber
        }
      },
      'salesPrice': {
        title: '销售金额',
        dataIndex: 'salesPrice',
        key: 'salesPrice',
        sorter: {
          compare: (a, b) => a.salesPrice - b.salesPrice
        }
      },
    }
    const _dialogDataTableColumns = Object.assign([], dialogDataTableColumns)
    for (let key in columns) {
      if (permission.getChenliePermission().includes(key)) {
        const is_exist = _dialogDataTableColumns.some((item: DialogDataTableColumnsItem) => item.key === key )
        if (!is_exist) {
          _dialogDataTableColumns.push(columns[key])
        }
      }
    }
    return _dialogDataTableColumns
  }
  const columns = getChenliePermissionTableColumn()
  return { dialogDataTableColumns: columns, getPatternSaleReportByDays }
}

