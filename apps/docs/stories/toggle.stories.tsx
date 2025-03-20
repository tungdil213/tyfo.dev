import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@tyfo.dev/ui/primitives/toggle";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Star,
  Heart,
  Bell,
  List,
  ListOrdered,
  ListTree,
} from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style of the toggle",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Basic toggle
export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

// Text formatting toggles
export const TextFormatting: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

// Text alignment toggles
export const TextAlignment: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle variant="outline" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Justify">
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

// With text
export const WithText: Story = {
  render: () => (
    <div className="flex flex-col space-y-2">
      <Toggle aria-label="Toggle italic">
        <Star className="h-4 w-4" />
        <span>Star</span>
      </Toggle>
      <Toggle aria-label="Toggle notifications">
        <Bell className="h-4 w-4" />
        <span>Notifications</span>
      </Toggle>
      <Toggle aria-label="Toggle favorite">
        <Heart className="h-4 w-4" />
        <span>Favorite</span>
      </Toggle>
    </div>
  ),
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle size="sm" aria-label="Toggle small">
        <Star className="h-3 w-3" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle default">
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle large">
        <Star className="h-5 w-5" />
      </Toggle>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle disabled aria-label="Toggle disabled">
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle disabled pressed aria-label="Toggle disabled pressed">
        <Heart className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

// List view toggles
export const ListViewToggles: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle variant="outline" aria-label="List view">
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Ordered list view">
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Tree view">
        <ListTree className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

// Toggle group
export const ToggleGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Toggle
          variant="outline"
          className="rounded-r-none"
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          className="rounded-none border-l-0"
          aria-label="Ordered list view"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          className="rounded-l-none border-l-0"
          aria-label="Tree view"
        >
          <ListTree className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle
          variant="outline"
          className="rounded-r-none"
          aria-label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          className="rounded-none border-l-0"
          aria-label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          variant="outline"
          className="rounded-l-none border-l-0"
          aria-label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
};

// Custom styled toggles
export const CustomStyles: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle
        className="bg-blue-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white"
        aria-label="Blue toggle"
      >
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="bg-green-100 data-[state=on]:bg-green-500 data-[state=on]:text-white"
        aria-label="Green toggle"
      >
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="bg-red-100 data-[state=on]:bg-red-500 data-[state=on]:text-white"
        aria-label="Red toggle"
      >
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="bg-purple-100 data-[state=on]:bg-purple-500 data-[state=on]:text-white"
        aria-label="Purple toggle"
      >
        <Star className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}; 