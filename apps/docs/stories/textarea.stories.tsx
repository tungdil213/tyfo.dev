import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@tyfo.dev/ui/primitives/textarea";
import { Label } from "@tyfo.dev/ui/primitives/label";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// Basic textarea
export const Default: Story = {
  render: (args) => <Textarea {...args} />,
  args: {
    placeholder: "Type your message here.",
  },
};

// With label
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" {...args} />
    </div>
  ),
  args: {
    placeholder: "Type your message here.",
  },
};

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="disabled">Disabled textarea</Label>
      <Textarea
        id="disabled"
        {...args}
        disabled
        placeholder="You cannot edit this textarea."
      />
    </div>
  ),
};

// With fixed rows
export const WithRows: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="fixed-rows">Fixed height textarea</Label>
      <Textarea
        id="fixed-rows"
        {...args}
        rows={5}
        placeholder="This textarea has a fixed height of 5 rows."
      />
    </div>
  ),
};

// With validation state
export const WithError: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="error" className="text-destructive">
        Invalid input
      </Label>
      <Textarea
        id="error"
        {...args}
        aria-invalid
        placeholder="This textarea has an error."
      />
      <p className="text-sm text-destructive">
        Please enter at least 20 characters.
      </p>
    </div>
  ),
};

// With character count
export const WithCharacterCount: Story = {
  render: (args) => {
    const maxLength = 200;
    return (
      <div className="grid gap-2">
        <Label htmlFor="with-counter">Bio</Label>
        <div className="grid gap-1">
          <Textarea
            id="with-counter"
            {...args}
            maxLength={maxLength}
            placeholder="Tell us about yourself..."
          />
          <div className="text-sm text-muted-foreground text-right">
            {args.value?.toString().length || 0} / {maxLength} characters
          </div>
        </div>
      </div>
    );
  },
  args: {
    value: "I am a software developer...",
  },
};

// Form field example
export const FormField: Story = {
  render: (args) => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          {...args}
          placeholder="Tell us what you think..."
        />
        <p className="text-sm text-muted-foreground">
          Your feedback will help us improve our product.
        </p>
      </div>
    </div>
  ),
};

// Auto-resizing example
export const AutoResizing: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="auto-resize">Auto-resizing textarea</Label>
      <Textarea
        id="auto-resize"
        {...args}
        className="min-h-[60px] max-h-[200px] resize-y"
        placeholder="This textarea will auto-resize between 60px and 200px."
      />
    </div>
  ),
};

// Rich text example
export const RichText: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="rich-text">Description</Label>
      <div className="grid gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Markdown is supported.</span>
          <span>•</span>
          <span>Use ** for bold</span>
          <span>•</span>
          <span>Use * for italic</span>
        </div>
        <Textarea
          id="rich-text"
          {...args}
          placeholder="**Bold** and *italic* text is supported."
          rows={6}
        />
      </div>
    </div>
  ),
}; 