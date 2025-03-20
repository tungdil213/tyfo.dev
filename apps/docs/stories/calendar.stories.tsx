import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@tyfo.dev/ui/primitives/calendar"
import { Card } from "@tyfo.dev/ui/primitives/card"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

const meta = {
  title: "Primitives/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-[350px] w-full items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof Calendar>

// Basic calendar
export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
}

// Date range selection
export const WithDateRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    })

    return (
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Date Range</h3>
            <p className="text-sm text-muted-foreground">
              {range?.from ? (
                range.to ? (
                  <>
                    {format(range.from, "LLL dd, y")} -{" "}
                    {format(range.to, "LLL dd, y")}
                  </>
                ) : (
                  format(range.from, "LLL dd, y")
                )
              ) : (
                "Pick a date range"
              )}
            </p>
          </div>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </div>
      </Card>
    )
  },
}

// With disabled dates
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const disabledDays = [
      { from: addDays(new Date(), -5), to: addDays(new Date(), -2) },
      { from: addDays(new Date(), 2), to: addDays(new Date(), 5) },
    ]

    return (
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Select Date</h3>
            <p className="text-sm text-muted-foreground">
              Some dates are disabled for selection
            </p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDays}
            className="rounded-md border"
          />
        </div>
      </Card>
    )
  },
}

// Multiple months
export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={3}
        className="rounded-md border"
      />
    )
  },
}

// Custom styles
export const CustomStyles: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border p-0"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    )
  },
}

// Fixed weeks
export const FixedWeeks: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        fixedWeeks
        showOutsideDays
        className="rounded-md border"
      />
    )
  },
} 