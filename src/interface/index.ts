export interface DialogDataTableColumnsItem {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: undefined;
}
export interface StockTableColumnsItem {
  title: string;
  key: string;
  dataIndex: string;
}
export interface SeekGroup {
  barcode: string
  times: string[]
}
export interface PatrolSeekGroup {
  dateTime: string[]
}

export interface ShelfPrams {
  patternCD: string
  patternID: number
  shelfNum: number
  organ: string
}
export type TypeOrderDataList = {
  storeName: string;
  deskId: string;
  status: string;
  orderTime: string;
}

export type TypeLastOrderDataList = {
  id: string;
  storeName: string;
  deskId: string;
  status: string;
  orderTime: string;
  peopleNum: number; // 人数
}