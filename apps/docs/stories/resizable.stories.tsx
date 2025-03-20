import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@tyfo.dev/ui/primitives/resizable"
import { Card } from "@tyfo.dev/ui/primitives/card"
import { ScrollArea } from "@tyfo.dev/ui/primitives/scroll-area"

const meta = {
  title: "Primitives/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[500px] w-full rounded-lg border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: "horizontal"
  },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Left Panel</h3>
            <p className="text-sm text-muted-foreground">Resize me using the handle!</p>
          </div>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Right Panel</h3>
            <p className="text-sm text-muted-foreground">Main content area</p>
          </div>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  args: {
    direction: "horizontal"
  },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <p className="text-sm text-muted-foreground">Left sidebar</p>
          </div>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Main Content</h3>
            <p className="text-sm text-muted-foreground">Central workspace</p>
          </div>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <p className="text-sm text-muted-foreground">Right sidebar</p>
          </div>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const VerticalLayout: Story = {
  args: {
    direction: "vertical"
  },
  render: () => (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={30}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Top Panel</h3>
            <p className="text-sm text-muted-foreground">Drag the handle below to resize</p>
          </div>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Bottom Panel</h3>
            <p className="text-sm text-muted-foreground">Content area</p>
          </div>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const NestedPanels: Story = {
  args: {
    direction: "horizontal"
  },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <Card className="h-full rounded-none">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <p className="text-sm text-muted-foreground">Left sidebar</p>
          </div>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <Card className="h-full rounded-none">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Main Content</h3>
                <p className="text-sm text-muted-foreground">Workspace area</p>
              </div>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <Card className="h-full rounded-none">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Console</h3>
                <p className="text-sm text-muted-foreground">Output and logs</p>
              </div>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const WithScrollArea: Story = {
  args: {
    direction: "horizontal"
  },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <Card className="h-full rounded-none">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              <h3 className="text-lg font-semibold">Navigation</h3>
              {Array.from({ length: 20 }, (_, i) => ({
                id: `nav-${i}`,
                label: `Item ${i + 1}`
              })).map((item) => (
                <div key={item.id} className="rounded border p-2">
                  {item.label}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <Card className="h-full rounded-none">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              <h3 className="text-lg font-semibold">Content</h3>
              {Array.from({ length: 30 }, (_, i) => ({
                id: `content-${i}`,
                label: `Content block ${i + 1}`
              })).map((item) => (
                <div key={item.id} className="rounded border p-4">
                  {item.label}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
} 