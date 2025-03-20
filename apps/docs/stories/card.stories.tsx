import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tyfo.dev/ui/primitives/card";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Switch } from "@tyfo.dev/ui/primitives/switch";
import { BellRing, Check, CreditCard, Settings, User } from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

// Notification card
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-4 w-4" />
          Notifications
        </CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to your device.
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Payment card
export const PaymentCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name on card</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="xxxx xxxx xxxx xxxx" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiry">Expiry date</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <User className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="Tell us about yourself"
            defaultValue="I'm a software developer based in San Francisco."
          />
          <p className="text-sm text-muted-foreground">
            This will be displayed on your profile.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="marketing" />
          <Label htmlFor="marketing">Receive marketing emails</Label>
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

// Grid of cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          title: "Total Revenue",
          description: "Revenue from all sources",
          value: "$45,231.89",
          change: "+20.1%",
          icon: CreditCard,
        },
        {
          title: "Active Users",
          description: "Users currently online",
          value: "2,420",
          change: "+10.5%",
          icon: User,
        },
      ].map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <span>{item.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}; 