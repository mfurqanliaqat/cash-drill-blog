import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table'

interface TableCellType {
  content: string
}

interface TableHeaderType {
  cells: TableCellType[]
}

interface TableRowType {
  cells: TableCellType[]
}

interface TableProps {
  heading?: string
  header?: TableHeaderType
  rows?: TableRowType[]
  caption?: string
}

const TableWidget: React.FC<TableProps> = ({ heading, header, rows, caption }) => {
  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      {heading && <h2 className='text-2xl font-bold mb-4'>{heading}</h2>}
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        {header && (
          <TableHeader>
            <TableRow>
              {header.cells?.map((cell, idx) => (
                <TableHead key={idx}>{cell.content}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {rows?.length ? (
            rows.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {row.cells?.map((cell, cellIdx) => (
                  <TableCell key={cellIdx}>{cell.content}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={header?.cells?.length || 1} className='text-center'>
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableWidget
