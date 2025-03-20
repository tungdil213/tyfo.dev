import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@tyfo.dev/ui/primitives/avatar";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import { cn } from "@tyfo.dev/ui/utils";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic avatar with image
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

// Avatar with fallback
export const WithFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CK</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// With status indicator
export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { status: "online", color: "bg-green-500" },
        { status: "idle", color: "bg-yellow-500" },
        { status: "offline", color: "bg-gray-500" },
        { status: "busy", color: "bg-red-500" },
      ].map((item) => (
        <div key={item.status} className="relative">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
              item.color
            )}
          />
        </div>
      ))}
    </div>
  ),
};

// Avatar group
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center space-x-[-0.75rem]">
      {[1, 2, 3, 4, 5].map((i) => (
        <Avatar key={i} className="border-2 border-background">
          <AvatarImage
            src={`https://github.com/shadcn${i}.png`}
            alt={`User ${i}`}
          />
          <AvatarFallback>U{i}</AvatarFallback>
        </Avatar>
      ))}
      <Badge variant="secondary" className="ml-4">
        +12 others
      </Badge>
    </div>
  ),
};

// Custom styled avatars
export const CustomStyles: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar className="bg-blue-500">
        <AvatarFallback className="text-white">BL</AvatarFallback>
      </Avatar>
      <Avatar className="bg-green-500">
        <AvatarFallback className="text-white">GR</AvatarFallback>
      </Avatar>
      <Avatar className="bg-red-500">
        <AvatarFallback className="text-white">RD</AvatarFallback>
      </Avatar>
      <Avatar className="bg-gradient-to-r from-purple-500 to-pink-500">
        <AvatarFallback className="text-white">GP</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// With border
export const WithBorder: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar className="ring-2 ring-primary ring-offset-2">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-blue-500 ring-offset-2">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-green-500 ring-offset-2">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// Interactive avatars
export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <Avatar
          key={i}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <AvatarImage
            src={`https://github.com/shadcn${i}.png`}
            alt={`User ${i}`}
          />
          <AvatarFallback>U{i}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}; 