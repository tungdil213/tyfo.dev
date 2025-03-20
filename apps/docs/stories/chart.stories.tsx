import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@tyfo.dev/ui/primitives/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Card } from "@tyfo.dev/ui/primitives/card"

const meta = {
  title: "Primitives/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-[350px] w-full items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof ChartContainer>

// Line chart
export const LineChartExample: Story = {
  args: {
    config: {
      sales: {
        label: "Sales",
        theme: {
          light: "#2563eb",
          dark: "#60a5fa",
        },
      },
      revenue: {
        label: "Revenue",
        theme: {
          light: "#16a34a",
          dark: "#4ade80",
        },
      },
    },
  },
  render: ({ config }) => {
    const data = [
      { month: "Jan", sales: 100, revenue: 150 },
      { month: "Feb", sales: 200, revenue: 250 },
      { month: "Mar", sales: 150, revenue: 200 },
      { month: "Apr", sales: 300, revenue: 400 },
      { month: "May", sales: 250, revenue: 300 },
      { month: "Jun", sales: 400, revenue: 500 },
    ]

    return (
      <Card className="w-[800px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <p className="text-sm text-muted-foreground">
              Monthly sales and revenue data
            </p>
          </div>
          <ChartContainer config={config}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </Card>
    )
  },
}

// Area chart
export const AreaChartExample: Story = {
  args: {
    config: {
      visitors: {
        label: "Visitors",
        theme: {
          light: "#8b5cf6",
          dark: "#a78bfa",
        },
      },
    },
  },
  render: ({ config }) => {
    const data = [
      { hour: "00:00", visitors: 100 },
      { hour: "04:00", visitors: 50 },
      { hour: "08:00", visitors: 200 },
      { hour: "12:00", visitors: 500 },
      { hour: "16:00", visitors: 400 },
      { hour: "20:00", visitors: 300 },
      { hour: "24:00", visitors: 200 },
    ]

    return (
      <Card className="w-[800px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Daily Traffic</h3>
            <p className="text-sm text-muted-foreground">
              Website visitors over 24 hours
            </p>
          </div>
          <ChartContainer config={config}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>
    )
  },
}

// Bar chart
export const BarChartExample: Story = {
  args: {
    config: {
      mobile: {
        label: "Mobile",
        theme: {
          light: "#f97316",
          dark: "#fb923c",
        },
      },
      desktop: {
        label: "Desktop",
        theme: {
          light: "#06b6d4",
          dark: "#22d3ee",
        },
      },
    },
  },
  render: ({ config }) => {
    const data = [
      { platform: "Mon", mobile: 200, desktop: 300 },
      { platform: "Tue", mobile: 300, desktop: 400 },
      { platform: "Wed", mobile: 250, desktop: 350 },
      { platform: "Thu", mobile: 400, desktop: 450 },
      { platform: "Fri", mobile: 350, desktop: 400 },
      { platform: "Sat", mobile: 450, desktop: 500 },
      { platform: "Sun", mobile: 500, desktop: 600 },
    ]

    return (
      <Card className="w-[800px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Platform Usage</h3>
            <p className="text-sm text-muted-foreground">
              Daily active users by platform
            </p>
          </div>
          <ChartContainer config={config}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" />
              <Bar dataKey="desktop" fill="var(--color-desktop)" />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    )
  },
}

// Pie chart
export const PieChartExample: Story = {
  args: {
    config: {
      chrome: {
        label: "Chrome",
        theme: {
          light: "#2563eb",
          dark: "#60a5fa",
        },
      },
      firefox: {
        label: "Firefox",
        theme: {
          light: "#ea580c",
          dark: "#fb923c",
        },
      },
      safari: {
        label: "Safari",
        theme: {
          light: "#0891b2",
          dark: "#22d3ee",
        },
      },
      edge: {
        label: "Edge",
        theme: {
          light: "#0d9488",
          dark: "#2dd4bf",
        },
      },
    },
  },
  render: ({ config }) => {
    const data = [
      { name: "chrome", value: 50 },
      { name: "firefox", value: 20 },
      { name: "safari", value: 20 },
      { name: "edge", value: 10 },
    ]

    return (
      <Card className="w-[400px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Browser Share</h3>
            <p className="text-sm text-muted-foreground">
              Distribution of browser usage
            </p>
          </div>
          <ChartContainer config={config}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={`var(--color-${entry.name})`}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </Card>
    )
  },
} 