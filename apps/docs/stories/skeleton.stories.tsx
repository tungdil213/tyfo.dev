import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@tyfo.dev/ui/primitives/skeleton";
import { Card } from "@tyfo.dev/ui/primitives/card";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic skeleton
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
};

// Text block skeleton
export const TextBlock: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[280px]" />
    </div>
  ),
};

// Card skeleton
export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  ),
};

// Table skeleton
export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="border rounded-lg p-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`row-${i}`} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <Skeleton className="ml-auto h-8 w-[100px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Grid skeleton
export const GridSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[800px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={`card-${i}`} className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  ),
};

// Form skeleton
export const FormSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-[100px]" />
    </div>
  ),
};

// Chat interface skeleton
export const ChatSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`message-${i}`}
          className={`flex items-start gap-2.5 ${
            i % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className={`space-y-2 ${i % 2 === 0 ? "items-start" : "items-end"}`}>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-16 w-[200px] rounded-lg" />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-4">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  ),
}; 