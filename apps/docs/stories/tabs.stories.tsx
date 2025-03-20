import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tyfo.dev/ui/primitives/tabs";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { Card, CardContent } from "@tyfo.dev/ui/primitives/card";
import {
  CreditCard,
  Settings,
  User,
  Mail,
  MessageSquare,
  PlusCircle,
  Bell,
} from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

// Tabs with icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="profile">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john@example.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-4 w-4" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Email Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <MessageSquare className="h-4 w-4" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Message Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your messages.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Light
                </Button>
                <Button variant="outline" size="sm">
                  Dark
                </Button>
                <Button variant="outline" size="sm">
                  System
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  English
                </Button>
                <Button variant="outline" size="sm">
                  Spanish
                </Button>
                <Button variant="outline" size="sm">
                  French
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Payment methods tabs
export const PaymentMethods: Story = {
  render: () => (
    <Tabs defaultValue="cards" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cards">
          <CreditCard className="mr-2 h-4 w-4" />
          Cards
        </TabsTrigger>
        <TabsTrigger value="new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cards">
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {[
                {
                  name: "Visa ending in 1234",
                  expires: "04/24",
                },
                {
                  name: "Mastercard ending in 5678",
                  expires: "08/25",
                },
              ].map((card) => (
                <div
                  key={card.name}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {card.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {card.expires}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" placeholder="xxxx xxxx xxxx xxxx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="CVC" />
              </div>
            </div>
            <Button className="w-full">Add Card</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Disabled state
export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-muted-foreground">
          This is an active tab that you can interact with.
        </p>
      </TabsContent>
      <TabsContent value="disabled">
        <p className="text-sm text-muted-foreground">
          This content is not accessible because the tab is disabled.
        </p>
      </TabsContent>
      <TabsContent value="pending">
        <p className="text-sm text-muted-foreground">
          This is another active tab you can interact with.
        </p>
      </TabsContent>
    </Tabs>
  ),
}; 