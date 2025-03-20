import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Checkbox } from "@tyfo.dev/ui/primitives/checkbox";
import { Switch } from "@tyfo.dev/ui/primitives/switch";
import { RadioGroup, RadioGroupItem } from "@tyfo.dev/ui/primitives/radio-group";

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

// Basic label
export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

// Required field
export const Required: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="username" className="after:text-destructive after:content-['*'] after:ml-0.5">
        Username
      </Label>
      <Input type="text" id="username" placeholder="Enter your username" required />
    </div>
  ),
};

// With description
export const WithDescription: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Input id="bio" placeholder="Tell us about yourself" />
      <p className="text-sm text-muted-foreground">
        Write a short description about yourself.
      </p>
    </div>
  ),
};

// With checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

// With switch
export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

// With radio group
export const WithRadioGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="disabled-input" className="text-muted-foreground">
          Disabled Input
        </Label>
        <Input id="disabled-input" disabled />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checkbox" disabled />
        <Label htmlFor="disabled-checkbox" className="text-muted-foreground">
          Disabled Checkbox
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" className="text-muted-foreground">
          Disabled Switch
        </Label>
      </div>
    </div>
  ),
};

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="error-input" className="text-destructive">
        Error Input
      </Label>
      <Input
        id="error-input"
        aria-invalid
        className="border-destructive focus-visible:ring-destructive/30"
      />
      <p className="text-sm text-destructive">This field is required.</p>
    </div>
  ),
};

// Form group
export const FormGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
          placeholder="Enter your message"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Receive marketing emails</Label>
      </div>
    </div>
  ),
}; 