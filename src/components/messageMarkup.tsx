import type { ReactNode } from "react"

type MarkupRendererProps = {
  children?: ReactNode
  options: { href: unknown }
}

export const linkMarkup = {
  a: ({ children, options }: MarkupRendererProps) => (
    <a href={String(options.href)}>{children}</a>
  ),
}