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
import { DataTableProps } from './types'
import { Card, CardHeader } from '../ui/card'

const DataTable: React.FC<DataTableProps> = ({ heading, header, rows, caption }) => {
  const columnCount = header?.cells?.length || 1

  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      {heading && <h2 className='text-2xl font-bold'>{heading}</h2>}
      <Card variant='gradient'>
        <div className='overflow-x-auto'>
          <Table className='min-w-full not-prose'>
            {caption && <TableCaption>{caption}</TableCaption>}
            {header && (
              <TableHeader>
                <TableRow>
                  {header.cells?.map((cell, idx) => (
                    <TableHead
                      key={idx}
                      className='min-w-[150px] w-[150px] text-left'
                      style={{ width: `${100 / columnCount}%` }}
                    >
                      {cell.content}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {rows?.length ? (
                rows.map((row, rowIdx) => (
                  <TableRow key={rowIdx}>
                    {row.cells?.map((cell, cellIdx) => (
                      <TableCell
                        key={cellIdx}
                        className='min-w-[150px] w-[150px]'
                        style={{ width: `${100 / columnCount}%` }}
                      >
                        {cell.content}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columnCount} className='text-center'>
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default DataTable
