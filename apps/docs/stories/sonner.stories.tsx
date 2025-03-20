import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Toaster } from "@tyfo.dev/ui/primitives/sonner"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { toast, type ToasterProps } from "sonner"
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

const meta = {
  title: "Primitives/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof Toaster>

// Basic toast
export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast("Event has been created")}>
        Show Toast
      </Button>
      <Button onClick={() => toast.success("Successfully created!")}>
        Success Toast
      </Button>
      <Button onClick={() => toast.error("Something went wrong!")}>
        Error Toast
      </Button>
      <Button onClick={() => toast.info("Deploy has started")}>
        Info Toast
      </Button>
      <Button onClick={() => toast.warning("Low disk space")}>
        Warning Toast
      </Button>
    </div>
  ),
}

// Custom styled toast
export const CustomStyled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast("Event has been created", {
            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        With Icon & Action
      </Button>
      <Button
        onClick={() =>
          toast.custom((t) => (
            <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <Info className="h-5 w-5" />
              <div className="flex-1">
                <p className="font-medium">Custom Toast</p>
                <p className="text-sm opacity-90">
                  This is a custom styled toast message
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast.dismiss(t)}
              >
                Dismiss
              </Button>
            </div>
          ))
        }
      >
        Custom Component
      </Button>
    </div>
  ),
}

// Promise toast
export const PromiseToast: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() => {
          const promise = new Promise((resolve) =>
            setTimeout(() => resolve("Success"), 2000)
          )

          toast.promise(promise, {
            loading: "Loading...",
            success: "Data has been loaded",
            error: "Error loading data",
          })
        }}
      >
        Start Promise
      </Button>
      <Button
        onClick={() => {
          toast.loading("Loading data...", {
            duration: 2000,
          })
        }}
      >
        Loading Toast
      </Button>
    </div>
  ),
}

// Rich content
export const RichContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast(
            <div className="flex items-center gap-4">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Update Available</p>
                <p className="text-sm text-muted-foreground">
                  A new software version is available for installation
                </p>
              </div>
            </div>,
            {
              action: {
                label: "Update",
                onClick: () => console.log("Update clicked"),
              },
              cancel: {
                label: "Later",
                onClick: () => console.log("Cancel clicked"),
              },
            }
          )
        }
      >
        Rich Content
      </Button>
      <Button
        onClick={() =>
          toast(
            <div className="grid gap-2">
              <p className="font-medium">Scheduled Maintenance</p>
              <p className="text-sm text-muted-foreground">
                Our servers will undergo maintenance on Sunday at 3 AM GMT.
                Expected duration: 2 hours.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Plan accordingly</span>
              </div>
            </div>
          )
        }
      >
        Complex Content
      </Button>
    </div>
  ),
}

// Position variations
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[
        { position: "top-left", label: "Top Left" },
        { position: "top-center", label: "Top Center" },
        { position: "top-right", label: "Top Right" },
        { position: "bottom-left", label: "Bottom Left" },
        { position: "bottom-center", label: "Bottom Center" },
        { position: "bottom-right", label: "Bottom Right" },
      ].map((item) => (
        <Button
          key={item.position}
          onClick={() =>
            toast("Notification", {
              position: item.position as ToasterProps["position"],
            })
          }
        >
          {item.label}
        </Button>
      ))}
    </div>
  ),
} 