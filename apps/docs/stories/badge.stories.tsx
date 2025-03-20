import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import {
  CheckCircle2,
  Clock,
  Crown,
  Globe,
  ShieldCheck,
  Star,
  Timer,
  Trash2,
  User,
  Zap,
} from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style of the badge",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render the badge as a child component",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic badges
export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Status badges
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="bg-green-500">
        <CheckCircle2 className="h-3 w-3" />
        Active
      </Badge>
      <Badge variant="secondary" className="bg-yellow-500 text-white">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
      <Badge variant="destructive">
        <Trash2 className="h-3 w-3" />
        Deleted
      </Badge>
      <Badge variant="outline" className="text-blue-500">
        <Globe className="h-3 w-3" />
        Public
      </Badge>
    </div>
  ),
};

// User roles
export const UserRoles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="bg-purple-500">
        <Crown className="h-3 w-3" />
        Admin
      </Badge>
      <Badge variant="secondary">
        <ShieldCheck className="h-3 w-3" />
        Moderator
      </Badge>
      <Badge variant="outline">
        <User className="h-3 w-3" />
        User
      </Badge>
    </div>
  ),
};

// Feature badges
export const Features: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="bg-gradient-to-r from-pink-500 to-purple-500">
        <Zap className="h-3 w-3" />
        Pro
      </Badge>
      <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <Star className="h-3 w-3" />
        New
      </Badge>
      <Badge variant="outline" className="border-2">
        <Timer className="h-3 w-3" />
        Limited Time
      </Badge>
    </div>
  ),
};

// As links
export const AsLinks: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[
        { href: "#profile", label: "Profile", variant: "default" as const },
        { href: "#settings", label: "Settings", variant: "secondary" as const },
        { href: "#help", label: "Help", variant: "outline" as const },
      ].map((link) => (
        <Badge
          key={link.href}
          variant={link.variant}
          asChild
        >
          <a href={link.href}>{link.label}</a>
        </Badge>
      ))}
    </div>
  ),
};

// Notification badges
export const Notifications: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative inline-flex">
        <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0">
          3
        </Badge>
        <div className="h-10 w-10 rounded-full bg-secondary" />
      </div>
      <div className="relative inline-flex">
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
        >
          5
        </Badge>
        <div className="h-10 w-10 rounded-full bg-secondary" />
      </div>
      <div className="relative inline-flex">
        <Badge
          variant="outline"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
        >
          9
        </Badge>
        <div className="h-10 w-10 rounded-full bg-secondary" />
      </div>
    </div>
  ),
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge className="text-[10px]">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="px-3 py-1 text-sm">Large</Badge>
      <Badge className="px-4 py-2 text-base">Extra Large</Badge>
    </div>
  ),
};

// Custom styles
export const CustomStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
        Custom Blue
      </Badge>
      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
        Custom Green
      </Badge>
      <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
        Custom Purple
      </Badge>
      <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
        Custom Orange
      </Badge>
    </div>
  ),
}; 