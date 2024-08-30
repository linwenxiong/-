import { apiGetGoodsStock } from '../../../api'
import { stockTableColumns } from '../../../constants/shelf-constants'
import { usePermissionStore } from '../../../stores/index'
import { StockTableColumnsItem } from '../../../interface'
export async function getGoodsStock(patternCD, patternID, shelfNum, organ) {
  const permission = usePermissionStore()
  const res = await apiGetGoodsStock({
    organ,
    patternCD,
    patternID,
    shelfNum
  })
  const { data } = res
  function getStockColumns() {
    const columns = {
       'stock': {
        title: '库存数量',
        key: 'stock',
        dataIndex: 'stock',
      }
    }
    const _stockTableColumns = Object.assign([], stockTableColumns)
    for (let key in columns) {
      if (permission.getChenliePermission().includes(key)) {
        const is_exist = _stockTableColumns.some((item: StockTableColumnsItem) => item.key === key )
        if (!is_exist) {
          _stockTableColumns.push(columns[key])
        }
      }
    }
    return _stockTableColumns
  }
  const columns = getStockColumns()
  return  {
    data,
    stockTableColumns:columns
  }
}
