import React from 'react'
import { BlurImage } from './blur-image'
import { cn } from '@/lib/utils'

interface PayoutSmallCardProps {
  avatarUrl?: string
  username: string
  displayName?: string
  method: string
  amount: number
}

export const PayoutSmallCard: React.FC<PayoutSmallCardProps> = ({
  avatarUrl,
  username,
  displayName,
  method,
  amount,
}) => {
  const initial = displayName?.[0]?.toUpperCase() || username?.[0]?.toUpperCase() || '?'
  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-neutral-900 rounded-2xl p-1 min-w-fit border-2 border-neutral-700 cursor-pointer select-none shadow-[0_3px_0_0_rgba(255,255,255,0.2)]',
        'transition hover:scale-105 duration-200'
      )}
    >
      <div className='w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-800'>
        {avatarUrl ? (
          <BlurImage
            src={avatarUrl}
            alt={displayName || username}
            width={40}
            height={40}
            className='w-10 h-10 object-cover rounded-xl'
          />
        ) : (
          <span className='text-lg font-bold text-neutral-300'>{initial}</span>
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='text-xs text-neutral-400 leading-none'>{method}</div>
        <div className='truncate text-xs text-white leading-tight'>@{username}</div>
      </div>
      <div className='flex items-center bg-green/10 rounded-lg p-1 ml-2 '>
        <span className='text-green font-bold text-base'>${amount.toFixed(2)}</span>
        {/* <span className='ml-1 text-green-400 text-lg font-bold'>|</span> */}
      </div>
    </div>
  )
}

export default PayoutSmallCard
