import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@tyfo.dev/ui/primitives/alert-dialog"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Input } from "@tyfo.dev/ui/primitives/input"
import { Label } from "@tyfo.dev/ui/primitives/label"
import { AlertTriangle, Trash2, LogOut, Archive, Shield } from "lucide-react"

const meta = {
  title: "Primitives/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof AlertDialog>

// Basic alert dialog
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// Delete confirmation
export const DeleteConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Please type <strong>delete my account</strong> to confirm.
          </p>
          <Input placeholder="delete my account" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// Logout confirmation
export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account on this device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// Archive confirmation
export const ArchiveConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Archive className="mr-2 h-4 w-4" />
          Archive Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This project will be moved to the archive. Team members will no longer
            be able to access it unless it is unarchived.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="archive-reason">Reason for archiving</Label>
            <Input id="archive-reason" placeholder="Project completed..." />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Archive Project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// Security action
export const SecurityAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Enable 2FA
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enable Two-Factor Authentication</AlertDialogTitle>
          <AlertDialogDescription>
            Two-factor authentication adds an extra layer of security to your
            account. You will need to enter a code from your authenticator app
            every time you sign in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">Enhanced Security</p>
              <p className="text-sm text-muted-foreground">
                Protect your account with 2FA
              </p>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Setup Later</AlertDialogCancel>
          <AlertDialogAction>Setup Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} 