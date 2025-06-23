import React from 'react'

function SpinWheel() {
  return (
    <div className='border border-neutral-700 rounded-2xl p-10 relative overflow-hidden text-center max-w-[450px] mx-auto font-sans'>
      <div className='absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(7,200,116,0.1)_0%,rgba(3,117,69,0)_60%)] z-0'></div>
      <div className='relative z-10 flex flex-col items-center gap-6'>
        <h2 className='text-white text-[32px] font-bold leading-[1.4] max-w-[350px]'>
          Earn <span className='text-green'>up to $100</span> on your first completed offer
        </h2>
        <button className='bg-green text-black rounded-xl px-10 py-5 text-xl font-bold cursor-pointer shadow-[0_0_25px_rgba(0,245,140,0.5)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_35px_rgba(0,245,140,0.7)]'>
          Spin The Wheel
        </button>
      </div>
    </div>
  )
}

export default SpinWheel
