import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@tyfo.dev/ui/primitives/drawer"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Input } from "@tyfo.dev/ui/primitives/input"
import { Label } from "@tyfo.dev/ui/primitives/label"
import { ScrollArea } from "@tyfo.dev/ui/primitives/scroll-area"
import {
  Settings,
  User,
  CreditCard,
  Plus,
  X,
  ShoppingCart,
  Package,
  Trash2,
  Share2,
  Filter,
} from "lucide-react"

const meta = {
  title: "Primitives/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The direction the drawer should open",
    },
    modal: {
      control: "boolean",
      description: "Whether the drawer should be modal",
    },
    shouldScaleBackground: {
      control: "boolean",
      description: "Whether the background should scale when the drawer is open",
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof Drawer>

// Basic drawer
export const Default: Story = {
  args: {
    direction: "right",
  },
  render: ({ direction }) => (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// Shopping cart drawer
export const CartDrawer: Story = {
  args: {
    direction: "right",
  },
  render: ({ direction }) => (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart (3)
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>Review your items before checkout.</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[60vh] px-4">
          {Array.from({ length: 3 }, (_, i) => ({
            id: `item-${i + 1}`,
            name: `Product ${i + 1}`,
            price: `$${(i + 1) * 10}.00`,
            quantity: i + 1,
          })).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-muted" />
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium">{item.price}</p>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <DrawerFooter>
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm font-medium">Subtotal</p>
              <p className="text-sm text-muted-foreground">Shipping calculated at checkout</p>
            </div>
            <p className="text-lg font-bold">$60.00</p>
          </div>
          <Button className="w-full">Checkout</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Continue Shopping</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// Filter drawer
export const FilterDrawer: Story = {
  args: {
    direction: "left",
  },
  render: ({ direction }) => (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-[60vh] px-4">
          {["Category", "Price Range", "Brand", "Color", "Size"].map((section) => (
            <div key={section} className="border-b py-4">
              <h4 className="mb-4 text-sm font-medium">{section}</h4>
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => ({
                  id: `${section}-option-${i + 1}`,
                  label: `Option ${i + 1}`,
                })).map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={option.id} className="rounded" />
                    <label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
        <DrawerFooter>
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full">Reset</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// Share drawer
export const ShareDrawer: Story = {
  args: {
    direction: "bottom",
  },
  render: ({ direction }) => (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share this page</DrawerTitle>
          <DrawerDescription>
            Anyone with the link will be able to view this.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value="https://example.com/shared-page"
              className="flex-1"
            />
            <Button>Copy</Button>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { icon: User, label: "Friends" },
              { icon: CreditCard, label: "Email" },
              { icon: Package, label: "Message" },
              { icon: Plus, label: "More" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-2"
              >
                <item.icon className="h-8 w-8" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ),
} 