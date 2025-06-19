import React from 'react'
import { BlurImage } from './blur-image'
import { cn } from '@/lib/utils'

interface PayoutSmallCardProps {
  avatarUrl?: string
  username: string
  displayName?: string
  amount: number
}

export const PayoutSmallCard: React.FC<PayoutSmallCardProps> = ({
  avatarUrl,
  username,
  displayName,
  amount
}) => {
  const initial = displayName?.[0]?.toUpperCase() || username?.[0]?.toUpperCase() || '?'
  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-[#191A23] rounded-2xl px-4 py-3 min-w-[220px] max-w-xs shadow border border-neutral-800',
        'transition hover:scale-105 duration-200'
      )}
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-800">
        {avatarUrl ? (
          <BlurImage
            src={avatarUrl}
            alt={displayName || username}
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-xl"
          />
        ) : (
          <span className="text-lg font-bold text-neutral-300">{initial}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-neutral-400 leading-none">Stake</div>
        <div className="truncate text-base font-medium text-white leading-tight">@{username}</div>
      </div>
      <div className="flex items-center bg-[#232432] rounded-lg px-3 py-1 ml-2">
        <span className="text-green-400 font-bold text-lg">${amount.toFixed(2)}</span>
        <span className="ml-1 text-green-400 text-xl font-bold">|</span>
      </div>
    </div>
  )
}

export default PayoutSmallCard
