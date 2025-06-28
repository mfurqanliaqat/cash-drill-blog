interface TableCellType {
  content: string
}

interface TableHeaderType {
  cells: TableCellType[]
}

interface TableRowType {
  cells: TableCellType[]
}

export interface DataTableProps {
  heading?: string
  header?: TableHeaderType
  rows?: TableRowType[]
  caption?: string
}

export interface ComparisonTableProps {
  heading?: string
  header?: { left: string; right: string }
  rows?: { left: string; right: string }[]
  caption?: string
}
