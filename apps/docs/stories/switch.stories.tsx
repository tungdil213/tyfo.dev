import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@tyfo.dev/ui/primitives/switch";
import { Label } from "@tyfo.dev/ui/primitives/label";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the switch is required",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the switch is checked by default",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic switch
export const Default: Story = {
  render: (args) => <Switch {...args} />,
};

// With label
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode
      </Label>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled" disabled {...args} />
      <Label
        htmlFor="disabled"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Disabled
      </Label>
    </div>
  ),
};

// Checked state
export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked {...args} />
      <Label
        htmlFor="checked"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Enabled by default
      </Label>
    </div>
  ),
};

// With description
export const WithDescription: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <div className="flex items-center space-x-2">
        <Switch id="notifications" {...args} />
        <Label
          htmlFor="notifications"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable notifications
        </Label>
      </div>
      <p className="text-sm text-muted-foreground pl-[36px]">
        You will receive notifications when someone mentions you in a comment.
      </p>
    </div>
  ),
};

// Form field example
export const FormField: Story = {
  render: (args) => (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium">Notification Preferences</legend>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-1.5">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account activity.
            </p>
          </div>
          <Switch id="email-notifications" {...args} defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="grid gap-1.5">
            <Label htmlFor="marketing-emails">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
          <Switch id="marketing-emails" {...args} />
        </div>
        <div className="flex items-center justify-between">
          <div className="grid gap-1.5">
            <Label htmlFor="security-emails">Security emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
          <Switch id="security-emails" {...args} defaultChecked />
        </div>
      </div>
    </fieldset>
  ),
};

// With error state
export const WithError: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <div className="flex items-center space-x-2">
        <Switch id="error" aria-invalid {...args} />
        <Label
          htmlFor="error"
          className="text-sm font-medium leading-none text-destructive"
        >
          Accept terms and conditions
        </Label>
      </div>
      <p className="text-sm text-destructive pl-[36px]">
        You must accept the terms and conditions to continue.
      </p>
    </div>
  ),
}; 