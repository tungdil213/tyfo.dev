import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@tyfo.dev/ui/primitives/separator";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Mail, Home, Settings, CreditCard, User } from "lucide-react";

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// Basic separator
export const Default: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

// Menu separator
export const MenuSeparator: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <div className="px-2 py-1.5 text-sm">My Account</div>
      <div className="px-2 py-1.5 text-sm">Profile</div>
      <div className="px-2 py-1.5 text-sm">Settings</div>
      <Separator className="my-2" />
      <div className="px-2 py-1.5 text-sm text-destructive">Logout</div>
    </div>
  ),
};

// Navigation with icons
export const NavigationWithIcons: Story = {
  render: () => (
    <div className="w-[250px] space-y-2">
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </div>
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
        <Mail className="h-4 w-4" />
        <span>Messages</span>
      </div>
      <Separator className="my-2" />
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
        <User className="h-4 w-4" />
        <span>Profile</span>
      </div>
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
        <CreditCard className="h-4 w-4" />
        <span>Billing</span>
      </div>
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </div>
    </div>
  ),
};

// Content sections
export const ContentSections: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold">Section 1</h4>
        <p className="text-sm text-muted-foreground">
          This is the first section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-lg font-semibold">Section 2</h4>
        <p className="text-sm text-muted-foreground">
          This is the second section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-lg font-semibold">Section 3</h4>
        <p className="text-sm text-muted-foreground">
          This is the third section of the content.
        </p>
      </div>
    </div>
  ),
};

// Card layout
export const CardLayout: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="space-y-2">
        <h4 className="font-medium">Card Title</h4>
        <p className="text-sm text-muted-foreground">Card description goes here.</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Enter your email"
          />
        </div>
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  ),
};

// Vertical layout
export const VerticalLayout: Story = {
  render: () => (
    <div className="flex h-[200px]">
      <div className="flex items-center justify-center p-4">
        <div className="space-y-2 text-center">
          <h4 className="text-lg font-semibold">Left Panel</h4>
          <p className="text-sm text-muted-foreground">Navigation menu</p>
        </div>
      </div>
      <Separator orientation="vertical" className="mx-4" />
      <div className="flex items-center justify-center p-4">
        <div className="space-y-2 text-center">
          <h4 className="text-lg font-semibold">Main Content</h4>
          <p className="text-sm text-muted-foreground">Your content goes here</p>
        </div>
      </div>
      <Separator orientation="vertical" className="mx-4" />
      <div className="flex items-center justify-center p-4">
        <div className="space-y-2 text-center">
          <h4 className="text-lg font-semibold">Right Panel</h4>
          <p className="text-sm text-muted-foreground">Additional info</p>
        </div>
      </div>
    </div>
  ),
};

// Custom styled separators
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 text-sm font-medium">Default</h4>
        <Separator />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-medium">Colored</h4>
        <Separator className="bg-blue-500" />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-medium">Dashed</h4>
        <Separator className="border-dashed border-t bg-transparent" />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-medium">Dotted</h4>
        <Separator className="border-dotted border-t bg-transparent" />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-medium">Thick</h4>
        <Separator className="h-1 bg-primary" />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-medium">Gradient</h4>
        <Separator className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
      </div>
    </div>
  ),
}; 