import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@tyfo.dev/ui/primitives/popover";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Switch } from "@tyfo.dev/ui/primitives/switch";
import {
  Settings,
  Bell,
  Calendar,
  CreditCard,
  Download,
  Share,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "Primitives/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Basic popover
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Settings popover
export const SettingsPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Notifications</p>
              <p className="text-sm text-muted-foreground">
                Enable notification alerts.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Calendar</p>
              <p className="text-sm text-muted-foreground">
                Show calendar events.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Payment Method</p>
              <p className="text-sm text-muted-foreground">
                Update payment details.
              </p>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Share popover
export const SharePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this document</h4>
            <p className="text-sm text-muted-foreground">
              Anyone with the link can view this document.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link" className="sr-only">Link</Label>
              <Input
                id="link"
                value="https://example.com/document"
                className="col-span-2 h-8"
                readOnly
              />
              <Button size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Share via Email
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Profile popover
export const ProfilePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 rounded-full p-0">
          <img
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="rounded-full"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full w-10 h-10"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">shadcn</h4>
              <p className="text-sm text-muted-foreground">@shadcn</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}; 