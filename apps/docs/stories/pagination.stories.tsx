import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@tyfo.dev/ui/primitives/pagination"

const meta = {
  title: "Primitives/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

// Basic pagination
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

// With ellipsis
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

// Interactive example
export const Interactive: Story = {
  render: function InteractivePagination() {
    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = 10

    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }

    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              const showEllipsis = totalPages > 7

              // Always show first and last pages
              if (page === 1 || page === totalPages) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      size="icon"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              // Show ellipsis for large ranges
              if (showEllipsis) {
                if (page === 2 && currentPage > 3) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                if (page === totalPages - 1 && currentPage < totalPages - 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
              }

              // Show pages around current page
              if (
                Math.abs(currentPage - page) <= 1 ||
                (!showEllipsis && page <= 7)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      size="icon"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              return null
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" className="pointer-events-none opacity-50" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

// Compact
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent className="gap-0.5">
        <PaginationItem>
          <PaginationPrevious href="#" size="default" className="h-8 w-8 p-0" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" className="h-8 w-8" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" className="h-8 w-8">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" className="h-8 w-8">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" className="h-8 w-8 p-0" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} 