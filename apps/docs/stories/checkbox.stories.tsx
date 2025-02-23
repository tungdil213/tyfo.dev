import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@tyfo.dev/ui/primitives/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic checkbox
export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};

// With label
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox disabled id="disabled" {...args} />
      <label
        htmlFor="disabled"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Disabled checkbox
      </label>
    </div>
  ),
};

// Checked state
export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked {...args} />
      <label
        htmlFor="checked"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Checked by default
      </label>
    </div>
  ),
};

// With error state
export const WithError: Story = {
  render: (args) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="error" aria-invalid {...args} />
        <label
          htmlFor="error"
          className="text-sm font-medium leading-none text-destructive"
        >
          Invalid checkbox
        </label>
      </div>
      <p className="text-sm text-destructive">Please check this box to proceed.</p>
    </div>
  ),
};

// Checkbox group
export const CheckboxGroup: Story = {
  render: (args) => (
    <div className="space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium leading-none">
          Select your favorite fruits
        </legend>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="apple" {...args} />
            <label
              htmlFor="apple"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apple
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="banana" {...args} />
            <label
              htmlFor="banana"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Banana
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="orange" {...args} />
            <label
              htmlFor="orange"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Orange
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  ),
};

// Form field example
export const FormField: Story = {
  render: (args) => (
    <div className="space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium leading-none">
          Newsletter Preferences
        </legend>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" {...args} />
            <label
              htmlFor="marketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Receive marketing emails
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="updates" defaultChecked {...args} />
            <label
              htmlFor="updates"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Receive product updates
            </label>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You can change these preferences at any time.
        </p>
      </fieldset>
    </div>
  ),
}; 