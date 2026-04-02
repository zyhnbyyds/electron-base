import type { ReactNode } from 'react'

interface InfoCardProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function InfoCard({ eyebrow, title, description, children }: InfoCardProps) {
  return (
    <section className="template-card rounded-3xl p-6 md:p-7">
      {eyebrow ? (
        <p className="template-kicker mb-3 text-[11px] font-semibold text-stone-400">{eyebrow}</p>
      ) : null}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-stone-900">{title}</h3>
        {description ? <p className="text-sm leading-6 text-stone-500">{description}</p> : null}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  )
}
