import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@tyfo.dev/ui/primitives/dialog";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Label } from "@tyfo.dev/ui/primitives/label";
import { AlertTriangle, Trash2 } from "lucide-react";

const meta: Meta<typeof Dialog> = {
  title: "Primitives/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is open by default",
    },
    modal: {
      control: "boolean",
      description: "Whether the dialog is modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic dialog
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            A dialog is a window overlaid on either the primary window or another
            dialog window. Content behind a modal dialog is inert, meaning that
            users cannot interact with it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form dialog
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Destructive action dialog
export const DestructiveDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Please type <strong>delete my account</strong> to confirm.
          </p>
          <Input placeholder="delete my account" />
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Share dialog
export const ShareDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            Copy
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="text-sm text-muted-foreground">
            Link expires in 24 hours.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Long content dialog
export const LongContentDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {[
            "General Terms",
            "Privacy Policy",
            "User Responsibilities",
            "Content Guidelines",
            "Intellectual Property",
            "Limitation of Liability",
            "Termination",
            "Governing Law",
            "Changes to Terms",
            "Contact Information",
          ].map((section, i) => (
            <div key={section} className="space-y-2">
              <h4 className="text-sm font-medium">{section}</h4>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                voluptatum, quae, voluptas, quod voluptatibus quas voluptates
                accusantium quia doloribus quibusdam nemo. Quisquam, quae
                voluptates. Quisquam, quae voluptates.
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept Terms</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}; 