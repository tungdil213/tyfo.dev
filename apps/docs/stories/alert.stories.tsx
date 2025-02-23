import type { Meta, StoryObj } from "@storybook/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@tyfo.dev/ui/primitives/alert";
import { Button } from "@tyfo.dev/ui/primitives/button";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  XCircle,
} from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Primitives/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "The visual style of the alert",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Basic alert
export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a basic alert with default styling.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive alert
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

// Success alert
export const Success: Story = {
  render: () => (
    <Alert>
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

// Warning alert
export const Warning: Story = {
  render: () => (
    <Alert>
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your account subscription will expire in 3 days.
      </AlertDescription>
    </Alert>
  ),
};

// With action
export const WithAction: Story = {
  render: () => (
    <Alert>
      <AlertCircle className="h-4 w-4 text-blue-500" />
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p>A new software update is available for installation.</p>
        <Button variant="outline" size="sm" className="w-fit">
          Install Update
        </Button>
      </AlertDescription>
    </Alert>
  ),
};

// Code snippet alert
export const CodeSnippet: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Installation Command</AlertTitle>
      <AlertDescription>
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">npm install @tyfo.dev/ui</code>
        </pre>
      </AlertDescription>
    </Alert>
  ),
};

// Multiple paragraphs
export const MultiParagraph: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Privacy Policy Update</AlertTitle>
      <AlertDescription>
        <p>
          We've updated our privacy policy to better protect your personal
          information and comply with new data protection regulations.
        </p>
        <p className="mt-2">
          The changes will take effect on January 1st, 2024. Please review the
          updated policy to understand how these changes affect you.
        </p>
      </AlertDescription>
    </Alert>
  ),
};

// Alert stack
export const AlertStack: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>General information message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Critical error message.</AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success confirmation message.</AlertDescription>
      </Alert>
      <Alert>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning notification message.</AlertDescription>
      </Alert>
    </div>
  ),
}; 