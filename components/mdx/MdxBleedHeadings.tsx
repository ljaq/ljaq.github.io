import type { ComponentPropsWithoutRef } from 'react'

import { FullBleedLine } from '@/components/layout/ContentBleed'

export function MdxH2(props: ComponentPropsWithoutRef<'h2'>) {
  return (
    <div className='relative'>
      <FullBleedLine />
      <h2
        className='relative z-10 mt-10 mb-3 text-2xl font-medium tracking-[-0.035em] text-ink first:mt-0 md:text-[1.65rem]'
        {...props}
      />
      <FullBleedLine />
    </div>
  )
}

export function MdxH3(props: ComponentPropsWithoutRef<'h3'>) {
  return (
    <div className='relative'>
      <FullBleedLine />
      <h3
        className='relative z-10 mt-8 mb-2 text-xl font-medium tracking-[-0.03em] text-ink first:mt-0'
        {...props}
      />
      <FullBleedLine />
    </div>
  )
}
