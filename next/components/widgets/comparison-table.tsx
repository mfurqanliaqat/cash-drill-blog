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
import { IconCheck, IconX } from '@tabler/icons-react'
import { ComparisonTableProps } from './types'
import { Card } from '../ui/card'

const ComparisonTable: React.FC<ComparisonTableProps> = ({ heading, header, rows, caption }) => {
  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      {heading && <h2 className='text-2xl font-bold mb-4'>{heading}</h2>}
      <Card variant='gradient'>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          {header && (
            <TableHeader>
              <TableRow>
                <TableHead className='!text-primary w-1/2'>{header.left}</TableHead>
                <TableHead className='!text-error w-1/2'>{header.right}</TableHead>
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {rows?.length ? (
              rows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className='w-1/2'>
                    <div className='flex items-center gap-2'>
                      <IconCheck className='h-5 w-5 text-primary' />
                      {row.left}
                    </div>
                  </TableCell>
                  <TableCell className='w-1/2'>
                    <div className='flex items-center gap-2'>
                      <IconX className='h-5 w-5 text-error' />
                      {row.right}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className='text-center'>
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default ComparisonTable
