import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@tyfo.dev/ui/primitives/radio-group";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Card } from "@tyfo.dev/ui/primitives/card";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import {
  Laptop,
  Moon,
  Sun,
  CreditCard,
  Wallet,
  Smartphone,
  Inbox,
  Archive,
  Trash,
} from "lucide-react";

const meta: Meta<typeof RadioGroup> = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Basic radio group
export const Default: Story = {
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

// Theme selector
export const ThemeSelector: Story = {
  render: () => (
    <RadioGroup defaultValue="system">
      <div className="grid gap-4">
        <Label className="text-base">Select Theme</Label>
        <div className="grid gap-2">
          {[
            { value: "light", label: "Light", icon: Sun },
            { value: "dark", label: "Dark", icon: Moon },
            { value: "system", label: "System", icon: Laptop },
          ].map((item) => (
            <div
              key={item.value}
              className="flex items-center space-x-2 rounded-md border p-3"
            >
              <RadioGroupItem value={item.value} id={item.value} />
              <Label
                htmlFor={item.value}
                className="flex flex-1 items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </RadioGroup>
  ),
};

// Payment methods
export const PaymentMethods: Story = {
  render: () => (
    <RadioGroup defaultValue="card">
      <div className="grid gap-4">
        <Label className="text-base">Payment Method</Label>
        <div className="grid gap-2">
          {[
            {
              value: "card",
              label: "Card",
              icon: CreditCard,
              description: "Pay with credit or debit card",
            },
            {
              value: "wallet",
              label: "Digital Wallet",
              icon: Wallet,
              description: "Pay with digital wallet",
            },
            {
              value: "mobile",
              label: "Mobile Payment",
              icon: Smartphone,
              description: "Pay with mobile payment",
            },
          ].map((item) => (
            <Card key={item.value} className="relative">
              <RadioGroupItem
                value={item.value}
                id={item.value}
                className="absolute right-4 top-4"
              />
              <Label
                htmlFor={item.value}
                className="block cursor-pointer p-4"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-6 w-6" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Label>
            </Card>
          ))}
        </div>
      </div>
    </RadioGroup>
  ),
};

// Email status
export const EmailStatus: Story = {
  render: () => (
    <RadioGroup defaultValue="inbox">
      <div className="grid gap-4">
        <Label className="text-base">Email Status</Label>
        <div className="grid gap-2">
          {[
            {
              value: "inbox",
              label: "Inbox",
              icon: Inbox,
              count: 12,
              description: "Unread messages",
            },
            {
              value: "archive",
              label: "Archive",
              icon: Archive,
              count: 245,
              description: "Archived messages",
            },
            {
              value: "trash",
              label: "Trash",
              icon: Trash,
              count: 8,
              description: "Deleted messages",
            },
          ].map((item) => (
            <div
              key={item.value}
              className="flex items-center space-x-2 rounded-md border p-3"
            >
              <RadioGroupItem value={item.value} id={item.value} />
              <Label
                htmlFor={item.value}
                className="flex flex-1 items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.count}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </RadioGroup>
  ),
}; 