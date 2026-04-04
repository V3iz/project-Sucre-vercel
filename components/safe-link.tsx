import type { AnchorHTMLAttributes } from "react"

interface SafeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function SafeLink({ href, children, className, onClick, ...rest }: SafeLinkProps) {
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}
