import type { Meta, StoryObj } from "@storybook/react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@tyfo.dev/ui/primitives/toggle-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  List,
  Rows,
  Columns,
  LayoutGrid,
  Moon,
  Sun,
  Laptop,
  Paintbrush,
  Eraser,
  Pen,
  Type,
} from "lucide-react";

const meta: Meta<typeof ToggleGroup> = {
  title: "Primitives/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Whether the group allows single or multiple selection",
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style of the toggle group",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle group",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle group is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

// Text alignment toggle group
export const TextAlignment: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Text formatting toggle group
export const TextFormatting: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

// View options
export const ViewOptions: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="list">
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="rows" aria-label="Row view">
        <Rows className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="columns" aria-label="Column view">
        <Columns className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Theme selector
export const ThemeSelector: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="system">
      <ToggleGroupItem value="light" aria-label="Light theme">
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark theme">
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="System theme">
        <Laptop className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Drawing tools
export const DrawingTools: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleGroup type="single" size="lg" defaultValue="brush">
        <ToggleGroupItem value="brush" aria-label="Brush tool">
          <Paintbrush className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="pen" aria-label="Pen tool">
          <Pen className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="text" aria-label="Text tool">
          <Type className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="eraser" aria-label="Eraser tool">
          <Eraser className="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleGroup type="single" size="sm" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-3 w-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-3 w-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-3 w-3" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="single" size="lg" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" disabled defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Custom styles
export const CustomStyles: Story = {
  render: () => (
    <ToggleGroup
      type="single"
      className="bg-secondary p-1 [&>*]:rounded-sm"
      defaultValue="brush"
    >
      <ToggleGroupItem
        value="brush"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Brush tool"
      >
        <Paintbrush className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="pen"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Pen tool"
      >
        <Pen className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="eraser"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Eraser tool"
      >
        <Eraser className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}; 