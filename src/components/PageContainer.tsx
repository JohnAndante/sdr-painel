'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from './ui/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageContainerProps {
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
  darkMode: boolean
  children: React.ReactNode
  actions?: React.ReactNode
}

export default function PageContainer({
  title,
  subtitle,
  breadcrumb = [],
  darkMode,
  children,
  actions
}: PageContainerProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="
        flex-shrink-0
        pb-6 mb-6
        border-b border-[--md-sys-color-outline-variant]
      ">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="mb-4 overflow-x-auto">
            <ol className="flex items-center gap-2 whitespace-nowrap">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      "md3-label-large transition-colors",
                      index === breadcrumb.length - 1
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground cursor-pointer"
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title and Actions */}
        <div className="
          flex flex-col sm:flex-row sm:items-start sm:justify-between
          gap-4
        ">
          <div className="min-w-0 flex-1 space-y-2">
            <h1 className="
              md3-headline-medium text-foreground
              truncate
            ">
              {title}
            </h1>
            {subtitle && (
              <p className="
                md3-body-large text-muted-foreground
                line-clamp-2 sm:line-clamp-1
              ">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}
