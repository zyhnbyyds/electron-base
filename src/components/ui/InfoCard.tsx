import type { ReactNode } from 'react'
import { Card, Typography } from 'antd'

interface InfoCardProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function InfoCard({ eyebrow, title, description, children }: InfoCardProps) {
  return (
    <Card className="template-card info-card rounded-[28px]">
      <div className="p-6 md:p-7">
        {eyebrow ? (
          <Typography.Text className="template-kicker mb-3 block text-[11px] font-semibold text-stone-400">
            {eyebrow}
          </Typography.Text>
        ) : null}
        <div className="space-y-2">
          <Typography.Title
            level={3}
            className="!mb-0 !text-lg !font-semibold !tracking-[-0.02em] !text-stone-900"
          >
            {title}
          </Typography.Title>
          {description ? (
            <Typography.Paragraph className="!mb-0 !text-sm !leading-6 !text-stone-500">
              {description}
            </Typography.Paragraph>
          ) : null}
        </div>
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </Card>
  )
}
