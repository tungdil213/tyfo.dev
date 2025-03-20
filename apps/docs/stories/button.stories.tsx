import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Mail, Loader2, Github } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render the button as a child component",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

// Base button with all variants
export const Default: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    variant: "default",
    size: "default",
  },
};

export const Secondary: Story = {
  render: (args) => <Button {...args}>Secondary</Button>,
  args: {
    variant: "secondary",
  },
};

export const Destructive: Story = {
  render: (args) => <Button {...args}>Destructive</Button>,
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  render: (args) => <Button {...args}>Outline</Button>,
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  render: (args) => <Button {...args}>Ghost</Button>,
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  render: (args) => <Button {...args}>Link</Button>,
  args: {
    variant: "link",
  },
};

// Size variations
export const Small: Story = {
  render: (args) => <Button {...args}>Small</Button>,
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  render: (args) => <Button {...args}>Large</Button>,
  args: {
    size: "lg",
  },
};

// Icon variations
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2" />
      Login with Email
    </Button>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <Button {...args} size="icon">
      <Mail />
    </Button>
  ),
};

// State variations
export const Loading: Story = {
  render: (args) => (
    <Button {...args} disabled>
      <Loader2 className="mr-2 animate-spin" />
      Please wait
    </Button>
  ),
};

export const Disabled: Story = {
  render: (args) => <Button {...args}>Disabled</Button>,
  args: {
    disabled: true,
  },
};

// Common use cases
export const WithGithub: Story = {
  render: (args) => (
    <Button {...args} variant="outline">
      <Github className="mr-2" />
      Login with Github
    </Button>
  ),
};

// Group of buttons
export const ButtonGroup: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Button variant="default">Save</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
};
