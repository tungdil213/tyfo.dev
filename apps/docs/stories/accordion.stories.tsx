import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@tyfo.dev/ui/primitives/accordion";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import {
  Settings,
  User,
  CreditCard,
  Bell,
  Mail,
  Shield,
  HelpCircle,
  Plus,
} from "lucide-react";

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Whether the accordion allows single or multiple items to be open",
    },
    collapsible: {
      control: "boolean",
      description: "Whether the accordion items can be collapsed after being opened",
    },
    disabled: {
      control: "boolean",
      description: "Whether the accordion is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic accordion
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Multiple items open
export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Customize your application settings and preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Manage your account details and security preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Configure your notification preferences and alerts.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// With badges
export const WithBadges: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Inbox</span>
          </div>
          <Badge variant="secondary">99+</Badge>
        </AccordionTrigger>
        <AccordionContent>
          View your unread messages and recent conversations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="flex justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </div>
          <Badge>New</Badge>
        </AccordionTrigger>
        <AccordionContent>
          Check your latest notifications and updates.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="flex justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </div>
          <Badge variant="destructive">1</Badge>
        </AccordionTrigger>
        <AccordionContent>
          Review your security settings and recent activity.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// FAQ style
export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[600px]">
      {[
        {
          question: "How do I get started?",
          answer:
            "To get started, simply sign up for an account and follow our quick start guide. We'll walk you through the basic setup process step by step.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely.",
        },
        {
          question: "Can I cancel my subscription?",
          answer:
            "Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period.",
        },
        {
          question: "How do I contact support?",
          answer:
            "Our support team is available 24/7. You can reach us through email, live chat, or by opening a support ticket in your dashboard.",
        },
      ].map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{item.question}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// With nested content
export const NestedContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Email Preferences</h4>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Marketing emails</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Social notifications</span>
                </label>
              </div>
            </div>
            <Button size="sm">Save preferences</Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Billing Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6" />
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 04/24</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add new
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Custom styles
export const CustomStyles: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-[400px] rounded-lg border p-6 [&>*]:border-0"
    >
      <AccordionItem value="item-1" className="bg-muted/50 px-4 rounded-md mb-2">
        <AccordionTrigger>Custom Style 1</AccordionTrigger>
        <AccordionContent>
          This item has a custom background and padding.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="bg-blue-100 dark:bg-blue-900/20 px-4 rounded-md mb-2"
      >
        <AccordionTrigger>Custom Style 2</AccordionTrigger>
        <AccordionContent>
          This item has a different background color.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 px-4 rounded-md"
      >
        <AccordionTrigger>Custom Style 3</AccordionTrigger>
        <AccordionContent>
          This item has a gradient background.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}; 