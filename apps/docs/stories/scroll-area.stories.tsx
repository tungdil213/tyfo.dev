import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@tyfo.dev/ui/primitives/scroll-area";
import { Separator } from "@tyfo.dev/ui/primitives/separator";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@tyfo.dev/ui/primitives/avatar";
import { Card } from "@tyfo.dev/ui/primitives/card";

const meta: Meta<typeof ScrollArea> = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

// Basic scroll area
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <React.Fragment key={`tag-${i}`}>
            <div className="text-sm">
              Item {i + 1}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Chat messages
export const ChatMessages: Story = {
  render: () => (
    <ScrollArea className="h-[500px] w-[350px] rounded-md border p-4">
      <h4 className="mb-4 text-sm font-medium">Chat Messages</h4>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`message-${i}`} className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarImage src={`https://github.com/shadcn${i % 3}.png`} />
              <AvatarFallback>
                {["JD", "AB", "CK"][i % 3]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">
                {["John Doe", "Alice Brown", "Chris King"][i % 3]}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(Date.now() - i * 60000).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </div>
          <Separator className="mt-4" />
        </div>
      ))}
    </ScrollArea>
  ),
};

// Horizontal scroll
export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`item-${i}`}
            className="w-[150px] shrink-0 rounded-md border p-4"
          >
            <div className="text-sm font-medium">Item {i + 1}</div>
            <div className="text-sm text-muted-foreground">
              Description for item {i + 1}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Card list
export const CardList: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[600px] rounded-md border p-4">
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={`card-${i}`} className="p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://github.com/shadcn${i % 3}.png`} />
                <AvatarFallback>
                  {["JD", "AB", "CK"][i % 3]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">
                  {["John Doe", "Alice Brown", "Chris King"][i % 3]}
                </div>
                <div className="text-sm text-muted-foreground">
                  Software Engineer
                </div>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {["Active", "Away", "Offline"][i % 3]}
              </Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Team member since {new Date(Date.now() - i * 86400000).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Documentation sections
export const DocumentationSections: Story = {
  render: () => (
    <ScrollArea className="h-[500px] w-[600px] rounded-md border p-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={`section-${i}`} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">
            Section {i + 1}: Getting Started
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={`example-${i}-${j}`}
                className="text-sm rounded-md bg-muted p-4"
              >
                Example {j + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </div>
            ))}
          </div>
          <Separator className="mt-8" />
        </div>
      ))}
    </ScrollArea>
  ),
}; 