import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@tyfo.dev/ui/primitives/tooltip";
import { Button } from "@tyfo.dev/ui/primitives/button";
import {
  HelpCircle,
  Info,
  Settings,
  Plus,
  Trash2,
  Copy,
  Share2,
  Calendar,
  Bell,
} from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="py-20 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic tooltip
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Help information
      </TooltipContent>
    </Tooltip>
  ),
};

// With different positions
export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { side: "top" as const, label: "Top tooltip" },
        { side: "right" as const, label: "Right tooltip" },
        { side: "bottom" as const, label: "Bottom tooltip" },
        { side: "left" as const, label: "Left tooltip" },
      ].map((item) => (
        <Tooltip key={item.side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={item.side}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2">
          <Settings className="h-3 w-3" />
          Settings
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2">
          <Plus className="h-3 w-3" />
          Add new item
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

// Action tooltips
export const ActionTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete item</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Share</TooltipContent>
      </Tooltip>
    </div>
  ),
};

// With delay
export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me (delay)</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip with 700ms delay
      </TooltipContent>
    </Tooltip>
  ),
};

// Multi-line content
export const MultiLine: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px] text-center">
        <p>Meeting with the team</p>
        <p className="text-xs text-primary/80">Today at 2:00 PM</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Interactive content
export const Interactive: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="w-80 p-0" sideOffset={10}>
        <div className="flex flex-col gap-2 p-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          <p className="text-xs text-primary/80">
            You have 3 unread notifications.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm">View all</Button>
            <Button size="sm">Mark as read</Button>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Success</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-green-500 text-white">
          Operation successful!
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Error</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-500 text-white">
          Something went wrong
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Custom</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Gradient tooltip
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}; 