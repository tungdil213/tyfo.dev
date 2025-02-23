import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@tyfo.dev/ui/primitives/hover-card";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Avatar, AvatarFallback, AvatarImage } from "@tyfo.dev/ui/primitives/avatar";
import { CalendarDays, Mail, MessageCircle, Github, Twitter, ExternalLink } from "lucide-react";

const meta: Meta<typeof HoverCard> = {
  title: "Primitives/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

// Basic hover card
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// User profile card
export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="w-[240px] justify-start">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <span>shadcn</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">shadcn</h4>
              <p className="text-sm text-muted-foreground">Staff Engineer at Vercel</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">1.2k</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email</span>
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">Website</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Social links
export const SocialLinks: Story = {
  render: () => (
    <div className="flex gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="https://github.com" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span className="font-semibold">Github</span>
            </div>
            <p className="text-sm text-muted-foreground">
              View our open source projects and contributions.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              <span className="font-semibold">Twitter</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates and announcements.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

// With different positions
export const Positions: Story = {
  render: () => (
    <div className="flex h-[350px] items-center justify-center">
      {[
        { side: "top" as const, label: "Top" },
        { side: "right" as const, label: "Right" },
        { side: "bottom" as const, label: "Bottom" },
        { side: "left" as const, label: "Left" },
      ].map((item) => (
        <HoverCard key={item.side}>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="m-4">
              {item.label}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side={item.side} className="w-32 text-center">
            <p className="text-sm">This card appears on the {item.label.toLowerCase()}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

// With custom styling
export const CustomStyles: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover for gradient</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gradient-to-br from-purple-500 to-pink-500 border-none">
        <div className="text-white">
          <h4 className="text-lg font-bold">Custom Styled Card</h4>
          <p className="text-sm opacity-90">
            This card has a gradient background and custom styling.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}; 