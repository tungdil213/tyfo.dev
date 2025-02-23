import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@tyfo.dev/ui/primitives/sheet";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Separator } from "@tyfo.dev/ui/primitives/separator";
import {
  Menu,
  Settings,
  User,
  Mail,
  MessageSquare,
  PlusCircle,
  CreditCard,
  Bell,
  Github,
} from "lucide-react";

const meta: Meta<typeof Sheet> = {
  title: "Primitives/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// Basic sheet
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Side variations
export const SideVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      {["top", "right", "bottom", "left"].map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open {side}</Button>
          </SheetTrigger>
          <SheetContent side={side as "top" | "right" | "bottom" | "left"}>
            <SheetHeader>
              <SheetTitle>Sheet {side}</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

// Navigation menu
export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {[
            { label: "Profile", icon: User },
            { label: "Settings", icon: Settings },
            { label: "Messages", icon: MessageSquare },
            { label: "Notifications", icon: Bell },
            { label: "Billing", icon: CreditCard },
          ].map((item) => (
            <Button key={item.label} variant="ghost" className="w-full justify-start">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
          <Separator />
          <Button variant="ghost" className="w-full justify-start">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// Settings panel
export const SettingsPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your account settings and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <h3 className="text-lg font-medium">Profile</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value="pedro@example.com"
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="marketing" className="text-right">
                  Marketing emails
                </Label>
                <div className="col-span-3 flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    Unsubscribe
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Subscribed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Create form
export const CreateForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Create item</SheetTitle>
          <SheetDescription>
            Add a new item to your collection.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter description" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" placeholder="Enter category" />
          </div>
          <SheetFooter>
            <Button type="submit">Create</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  ),
}; 