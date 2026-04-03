'use client'

import Link from 'next/link'
import { GithubOutlined, MailOutlined, PhoneOutlined, WechatOutlined } from '@ant-design/icons'
import { GridFrame } from '@/components/ui/GridFrame'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SketchDivider } from './SketchDivider'

const triggerClassName =
  'flex min-h-[3.25rem] w-full items-center justify-center text-neutral-500 transition hover:text-neutral-900 cursor-pointer'

const items = [
  { href: 'https://github.com', label: 'GitHub', Icon: GithubOutlined },
  {
    content: <img src='/images/wechat.png' alt='微信' width={120} height={120} className='max-w-full' />,
    label: '微信',
    Icon: WechatOutlined,
  },
  { content: 'jq_96m@163.com', label: '邮件', Icon: MailOutlined },
  { content: '13011550934', label: '电话', Icon: PhoneOutlined },
] as const

export function SocialSketchGrid() {
  return (
    <div>
      <SketchDivider />
      <div className='p-3'>
        <div className='grid grid-cols-2 gap-3'>
          {items.map((item) => {
            const { label, Icon } = item
            if ('href' in item) {
              const { href } = item
              const isExternal = href.startsWith('http')
              return (
                <GridFrame key={label} fill className='min-h-13 hover:border-neutral-400'>
                  <Link
                    href={href}
                    className={triggerClassName}
                    aria-label={label}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className='size-5' />
                  </Link>
                </GridFrame>
              )
            }
            const { content } = item
            return (
              <GridFrame key={label} corners fill className='min-h-13 hover:border-neutral-400'>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type='button' className={triggerClassName} aria-label={label}>
                      <Icon className='size-5' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align='start' side='right' className='w-auto max-w-[min(100vw-2rem,18rem)]'>
                    <div className='text-foreground font-mono'>{content}</div>
                  </PopoverContent>
                </Popover>
              </GridFrame>
            )
          })}
        </div>
      </div>
      <SketchDivider />
    </div>
  )
}
